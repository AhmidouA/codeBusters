import { Router } from "express";
import { homeController } from "../controllers/home.controller";

export const homeRouter = Router();

homeRouter.get("/", homeController);
