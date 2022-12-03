import { Router } from "express";
import { userRouter } from "./user/user.js";

export const apiRouter = Router();

apiRouter.use("/user", userRouter);
