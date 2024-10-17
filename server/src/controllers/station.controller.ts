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

export const getAvailableBikeSlot = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing id_api in query params" });
        }

        const now = new Date();
        const fromDate = new Date(
            new Date().getTime() - 10 * 60000 // 1 minute = 60,000 Milliseconds => - 10 minutes a l'heure actuelle
        )
            .toISOString()
            .slice(0, -5); // Convertir l'heure actuelle en ISO (ex: AAAA-MM-JJTHH:MM:SS)
        const toDate = now.toISOString().slice(0, -5); // Slice pour garder juste le HH:MM:SS

        console.log("fromDate", fromDate);
        console.log("toDate", toDate);

        const apiUrl = `https://portail-api-data.montpellier3m.fr/bikestation_timeseries/${encodeURIComponent(
            id
        )}/attrs/availableBikeNumber?fromDate=${encodeURIComponent(
            fromDate
        )}&toDate=${encodeURIComponent(toDate)}`;

        console.log("apiUrl", apiUrl);

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        });

        if (!response.ok) {
            res.status(400).json({ message: "Error fetching data from api" });
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.values) || data.values.length === 0)
            res.status(400).json({ message: "No available bike data" });

        // recupérer la derniere value du tableau
        const availableSlots = data.values[data.values.length - 1];

        res.status(200).json({ availableSlots });
    } catch (error) {
        console.error("Error getAvailableBikeSlot:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
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
