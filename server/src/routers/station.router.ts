import {
    getStations,
    importBikeStations,
    importCarStations,
} from "../controllers/station.controller";
import { Router } from "express";

export const stationRouter = Router();

stationRouter.get("/", getStations);
stationRouter.post("/bikes", importBikeStations);
stationRouter.post("/cars", importCarStations);
