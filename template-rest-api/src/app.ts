import express from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import error from "@/middleware/error";

const app = express();
const port = process.env.PORT || config.get("port");
const db = config.get("db") as string;

import postRouter from "@/routes/post";
import userRouter from "@/routes/user";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(error);

app.use("/post", postRouter);
app.use("/user", userRouter);

async function start() {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected to ${db}...`);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

start();
