import { Router } from "express";
import userController from "../../../controller/userController.js";

export const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
