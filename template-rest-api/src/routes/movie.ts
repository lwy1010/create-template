import express from "express";
import { MovieModel, validateMovie } from "@/models/movie";
import { successRes, errorRes, validateRes } from "@/utils/response";
import auth from "@/middleware/auth";
import adminAuth from "@/middleware/adminAuth";
import { Request, Response } from "express";

const router = express.Router();

router.post("/query", async (req: Request, res: Response) => {
  const { limit, page, name } = req.body;

  const query = { name: { $regex: name || "", $options: "i" } };
  const options = { page, limit: limit };

  const movies = await MovieModel.paginate(query, options);

  res.send(successRes(movies));
});

router.post("/", [auth], async (req: Request, res: Response) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const movie = new MovieModel({ title, rate });
  await movie.save();

  res.send(successRes(movie));
});

router.put("/:id", [auth], async (req: Request, res: Response) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const updateData = { title, rate };
  const movie = await MovieModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

router.get("/:id", async (req: Request, res: Response) => {
  const movie = await MovieModel.findById(req.params.id);
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

router.delete("/:id", [auth, adminAuth], async (req: Request, res: Response) => {
  const movie = await MovieModel.findByIdAndRemove(req.params.id);
  if (!movie) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(movie));
});

export default router;
