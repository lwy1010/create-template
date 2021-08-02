const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const port = process.env.PORT || config.get("port");
const db = config.get("db");

const movieRouter = require("./routes/movie");

app.use(express.json());
app.use("/movies", movieRouter);

async function start() {
  await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`Connected to ${db}...`);
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

start();
