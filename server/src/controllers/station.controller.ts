import { Request, Response } from "express";

/* shared */
import { haversineFormula } from "../shared/coordinates";
import { Station } from "../shared/station.types";

/* db */
import prisma from "../config/prisma/db.config";

const DEFAULT_RADIUS = 500;

export const getStations = async (req: Request, res: Response) => {
    try {
        const { latitude, longitude, radius } = req.query;

        // Utiliser le rayon par défaut si non fourni
        const searchRadius = radius
            ? parseFloat(radius as string)
            : DEFAULT_RADIUS;

        // Récupérer toutes les stations
        const stations = await prisma.station.findMany();

        // Filtrer les stations dans le rayon spécifié
        const nearbyStations = stations.filter((station: Station) => {
            const distance = haversineFormula(
                parseFloat(latitude as string),
                parseFloat(longitude as string),
                station.latitude,
                station.longitude
            );
            return distance <= searchRadius;
        });

        res.status(200).json({
            stations: nearbyStations,
        });
    } catch (error) {
        console.error("Error getStations:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getAvailableSlot = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "Missing id in query params" });

        return;
    }

    const fetchData = async (url: string, field: string) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                res.status(400).json({
                    message: "Error fetching data from API",
                });

                return;
            }

            const data = await response.json();

            if (!data || !data[0] || !data[0][field]) {
                res.status(400).json({ message: "No available data" });

                return;
            }

            res.status(200).json({ availableSlots: data[0][field].value });
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };

    if (id.includes("parking")) {
        await fetchData(
            `https://portail-api-data.montpellier3m.fr/offstreetparking?id=${encodeURIComponent(
                id
            )}`,
            "availableSpotNumber"
        );
    } else if (id.includes("station")) {
        await fetchData(
            `https://portail-api-data.montpellier3m.fr/bikestation?id=${encodeURIComponent(
                id
            )}`,
            "availableBikeNumber"
        );
    } else {
        res.status(400).json({ message: "Invalid ID type" });
    }
};

export const importBikeStations = async (req: Request, res: Response) => {
    const { fetchURL } = req.body;

    if (!fetchURL && !process.env.BIKE_STATION_URL) {
        res.status(400).json({ message: "Missing fetchURL" });
        return;
    }

    const response = await fetch(fetchURL || process.env.BIKE_STATION_URL);

    if (!response.ok) {
        res.status(500).json({ message: "Error fetching data" });
        return;
    }

    const data = await response.json();

    if (!data) {
        res.status(500).json({ message: "Error parsing data" });
        return;
    }

    if (!Array.isArray(data)) {
        res.status(500).json({ message: "Data is not an array" });
        return;
    }

    if (data.length === 0) {
        res.status(500).json({ message: "Data is empty" });
        return;
    }

    const stations = data.map((station: any) => ({
        id_api: station.id,
        station_type: "BIKE",
        address: station.address.value.streetAddress,
        city: station.address.value.addressLocality,
        latitude: station.location.value.coordinates[1],
        longitude: station.location.value.coordinates[0],
        total_spot: station.totalSlotNumber.value,
    }));

    const createMany = await prisma.station.createMany({
        data: stations as any,
        skipDuplicates: true,
    });

    res.status(200).json({ message: "Data fetched successfully", createMany });
};

export const importCarStations = async (req: Request, res: Response) => {
    const { fetchURL } = req.body;

    if (!fetchURL && !process.env.CAR_PARK_URL) {
        res.status(400).json({ message: "Missing fetchURL" });
        return;
    }

    const response = await fetch(fetchURL || process.env.CAR_PARK_URL);

    if (!response.ok) {
        console.log(response);

        res.status(500).json({ message: "Error fetching data" });
        return;
    }

    const data = await response.json();

    if (!data) {
        res.status(500).json({ message: "Error parsing data" });
        return;
    }

    if (!Array.isArray(data)) {
        res.status(500).json({ message: "Data is not an array" });
        return;
    }

    if (data.length === 0) {
        res.status(500).json({ message: "Data is empty" });
        return;
    }

    const stations = data.map((station: any) => ({
        id_api: station.id,
        station_type: "CAR",
        name: station.name.value,
        latitude: station.location.value.coordinates[1],
        longitude: station.location.value.coordinates[0],
        total_spot: station.totalSpotNumber.value,
    }));

    const createMany = await prisma.station.createMany({
        data: stations as any,
        skipDuplicates: true,
    });

    res.status(200).json({ message: "Data fetched successfully", createMany });
};
