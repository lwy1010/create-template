import express from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import error from "@/middleware/error";

const app = express();
const port = process.env.PORT || config.get("port");
const db = config.get("db") as string;

import movieRouter from "@/routes/movie";
import userRouter from "@/routes/user";

app.use(express.json());
app.use(cors());
app.use(error);

app.use("/movie", movieRouter);
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
