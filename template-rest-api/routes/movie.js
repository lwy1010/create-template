const express = require("express");
const { Movie, validateMovie } = require("../models/movie");

const router = express.Router();

router.get("/list", async (req, res) => {
  const { limit, page, name } = req.query;
  const query = {
    name: { $regex: name || "" },
  };
  const options = { page, limit: limit || 10 };
  const movies = await Movie.paginate(query, options);
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { title, rate } = req.body;
  const movie = new Movie({ title, rate });
  await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { title, rate } = req.body;
  const updateData = { title, rate };
  const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!movie) {
    return res.status(404).send("The movie with the given id was not found.");
  }
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("The movie with the given id was not found.");
  }
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    return res.status(404).send("The movie with the given id was not found.");
  }
  res.send(movie);
});

module.exports = router;
