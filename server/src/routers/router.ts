import { Router } from "express";
import { homeRouter } from "./home.router";

export const router = Router();

router.use("/api", homeRouter);
