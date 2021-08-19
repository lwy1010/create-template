const express = require("express");
const { Movie, validateMovie } = require("../models/movie");
const { successRes, errorRes, validateRes } = require("../utils/response");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", [auth], async (req, res) => {
  const { limit, page, name } = req.query;
  const query = { name: { $regex: name || "" } };
  const options = { page, limit: limit || 10 };

  const movies = await Movie.paginate(query, options);

  res.send(successRes(movies));
});

router.post("/", [auth], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const movie = new Movie({ title, rate });
  await movie.save();

  res.send(successRes(movie));
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const updateData = { title, rate };
  const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

router.get("/:id", [auth], async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

router.delete("/:id", [auth, adminAuth], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

module.exports = router;
