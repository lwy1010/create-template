import { Schema, model, Document, PaginateModel } from "mongoose";
import Joi from "joi";
import mongoosePaginate from "mongoose-paginate-v2";
import { Movie } from "@/types/movie";

const schema = new Schema({
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

const validateMovie = (movie: Movie) => {
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

schema.plugin(mongoosePaginate);

const MovieModel: PaginateModel<Movie & Document> = model("Movie", schema);

export { MovieModel, validateMovie };
