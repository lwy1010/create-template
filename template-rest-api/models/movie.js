const mongoose = require("mongoose");
const Joi = require("joi");
const mongoosePaginate = require("mongoose-paginate-v2");

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  duration: { type: String, required: true },
  categories: { type: [String], required: true },
  rate: { type: Number, min: 0, max: 10, required: true },
  summary: { type: String, required: true },
  poster: { type: String, required: true },
  casts: { type: [{ name: String, avatar: String }], required: true },
  cover: { type: String },
  video: { type: String },
});

const validateMovie = (movie) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    author: Joi.string().required(),
    duration: Joi.string().required(),
    categories: Joi.array().required(),
    rate: Joi.number().min(0).max(10).required(),
    summary: Joi.string().required(),
    poster: Joi.string().required(),
    casts: Joi.array().required(),
    cover: Joi.string(),
    video: Joi.string(),
  });

  return schema.validate(movie);
};

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
  validateMovie,
};
