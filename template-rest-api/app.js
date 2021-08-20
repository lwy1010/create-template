const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const error = require("./middleware/error");

const app = express();
const port = process.env.PORT || config.get("port");
const db = config.get("db");

const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cors());
app.use(error);

app.use("/movie", movieRouter);
app.use("/user", userRouter);

async function start() {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(`Connected to ${db}...`);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

start();
