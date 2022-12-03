import express from "express";
import { router } from "./router/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/public", express.static("public"));
app.use(express.json());

app.use("/", router);

const PORT = 8080;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
