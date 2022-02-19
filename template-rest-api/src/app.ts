import express from "express";
import mongoose from "mongoose";
import config from "@/config/config";
import cors from "cors";
import helmet from "helmet";
import error from "@/middleware/error";
import "module-alias/register";

const app = express();

import postRouter from "@/routes/post";
import userRouter from "@/routes/user";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(error);

app.use("/post", postRouter);
app.use("/user", userRouter);

async function start() {
  await mongoose.connect(config.databaseUrl);
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`);
  });
}

start();
