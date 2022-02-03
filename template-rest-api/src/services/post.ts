import { StatusCode } from "@/enums/statusCode";
import { PostModel } from "@/models/post";
import { formatRes } from "@/utils";
import { Request, Response } from "express";
import Joi from "joi";

export async function createPost(req: Request, res: Response) {
  const schema = Joi.object({
    title: Joi.string().required(),
    authorId: Joi.string().required(),
    content: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send(formatRes(null, error.details[0].message, StatusCode.validateFail));
  }

  const post = new PostModel(req.body);
  await post.save();

  res.send(formatRes(post));
}

export async function updatePost(req: Request, res: Response) {
  const schema = Joi.object({
    title: Joi.string().required(),
    authorId: Joi.string().required(),
    content: Joi.string().required(),
    collectCount: Joi.number().required(),
    readCount: Joi.number().required(),
    agreeCount: Joi.number().required(),
    isHot: Joi.boolean().required(),
    likeCount: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send(formatRes(null, error.details[0].message, StatusCode.validateFail));
  }

  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!post) {
    return res.send(formatRes(null, "post not found.", StatusCode.PostNotFound));
  }

  res.send(formatRes(post));
}

export async function readPosts(req: Request, res: Response) {
  const { limit, page } = req.body;
  const options = { page, limit: limit || 10 };

  const posts = await (PostModel as any).paginate({}, options);

  res.send(formatRes(posts));
}

export async function readPost(req: Request, res: Response) {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    return res.send(formatRes(null, "post not found.", StatusCode.PostNotFound));
  }

  res.send(formatRes(post));
}

export async function deletePost(req: Request, res: Response) {
  const post = await PostModel.findByIdAndRemove(req.params.id);

  if (!post) {
    return res.send(formatRes(null, "post not found.", StatusCode.PostNotFound));
  }

  res.send(formatRes(post));
}
