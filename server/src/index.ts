import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { router } from "./routers/router";

dotenv.config({ path: ".env" });
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(router);

app.listen(PORT, () => {
    console.log(`server runnig on ${PORT}`);
});
