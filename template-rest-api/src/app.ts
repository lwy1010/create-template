import express from "express";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import error from "@/middleware/error";

const app = express();
const port = process.env.PORT || config.get("port");
const dbName = config.get("dbName");
const dbAdmin = config.get("dbAdmin");
const password = config.get("password");
const url = `mongodb+srv://${dbAdmin}:${password}@template-rest-api.cme1h.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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
  await mongoose.connect(url);
  console.log(`Connected to ${dbName}...`);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

start();
