import { Request, Response } from "express";

export const getStations = (req: Request, res: Response) => {
    res.status(200).json({ message: "Liste des stations" });
};
