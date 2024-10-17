import { getStations } from "controllers/station.controller";
import { Router } from "express";

export const stationRouter = Router();

stationRouter.get("/", getStations);
