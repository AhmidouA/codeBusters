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
        console.log("req.params", req.query);

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
        console.error("Error user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
    res.status(200).json({ message: "Liste des stations" });
};
