import { StatusCode } from "@/enums/statusCode";
import { ArticleModel } from "@/models/article";
import { ArticleQuery, FilterQuery } from "@/types/article";
import { formatRes } from "@/utils/common";
import { Request, Response } from "express";
import Joi from "joi";

export async function createArticle(req: Request, res: Response) {
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

  const article = new ArticleModel(req.body);
  await article.save();

  res.send(formatRes(article));
}

export async function updateArticle(req: Request, res: Response) {
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

  const article = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!article) {
    return res.send(formatRes(null, "article not found.", StatusCode.ArticleNotFound));
  }

  res.send(formatRes(article));
}

export async function readArticles(req: Request, res: Response) {
  const { limit, page, title, isHot } = req.query as ArticleQuery;
  const options = { page, limit: limit || 10 };

  const query: FilterQuery = {};
  if (title) query.title = { $regex: new RegExp(title), $options: "i" };
  if (isHot) query.isHot = isHot;

  const articles = await ArticleModel.paginate(query, options);

  res.send(formatRes(articles));
}

export async function readArticle(req: Request, res: Response) {
  const article = await ArticleModel.findById(req.params.id);

  if (!article) {
    return res.send(formatRes(null, "article not found.", StatusCode.ArticleNotFound));
  }

  res.send(formatRes(article));
}

export async function deleteArticle(req: Request, res: Response) {
  const article = await ArticleModel.findByIdAndRemove(req.params.id);

  if (!article) {
    return res.send(formatRes(null, "article not found.", StatusCode.ArticleNotFound));
  }

  res.send(formatRes(article));
}
