import { Router } from "express";
import { homeRouter } from "./home.router";
import { stationRouter } from "./station.router";

export const router = Router();

router.use("/api", homeRouter);
router.use("/api/station", stationRouter);
