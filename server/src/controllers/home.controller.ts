import { Request, Response } from "express";

export const homeController = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Bienvenu sur codeBuster GPS" });
};
