import { PostModel, validatePost } from "@/models/post";
import { successRes, errorRes, validateRes } from "@/utils/response";
import { Request, Response } from "express";

export async function createPost(req: Request, res: Response) {
  const { error } = validatePost(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const post = new PostModel({ title, rate });
  await post.save();

  res.send(successRes(post));
}

export async function updatePost(req: Request, res: Response) {
  const { error } = validatePost(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { title, rate } = req.body;
  const updateData = { title, rate };
  const post = await PostModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!post) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(post));
}

export async function readPosts(req: Request, res: Response) {
  const { limit, page } = req.body;
  const options = { page, limit: limit || 10 };

  const posts = await PostModel.paginate({}, options);

  res.send(successRes(posts));
}

export async function readPost(req: Request, res: Response) {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(post));
}

export async function deletePost(req: Request, res: Response) {
  const post = await PostModel.findByIdAndRemove(req.params.id);
  if (!post) {
    return res.send(errorRes(40003));
  }

  res.send(successRes(post));
}
