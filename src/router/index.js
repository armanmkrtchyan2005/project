import { Router } from "express";
import { apiRouter } from "./api/index.js";

export const router = Router();

router.use("/api/v2", apiRouter);
