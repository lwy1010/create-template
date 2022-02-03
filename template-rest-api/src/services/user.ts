import { UserModel } from "@/models/user";
import bcryptjs from "bcryptjs";
import { pick, omit } from "lodash";
import { Request, Response } from "express";
import Joi from "joi";
import { formatRes, setupAvatar } from "@/utils";
import { StatusCode } from "@/enums/statusCode";

/**
 * @description 注册
 */
export async function signup(req: Request, res: Response) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
    email: Joi.string().min(3).max(20).required().email(),
    password: Joi.string().min(8).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send(formatRes(null, error.details[0].message, StatusCode.validateFail));
  }

  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.send(formatRes(null, "user already registered.", StatusCode.UserRegistered));
  }

  user = new UserModel({
    ...pick(req.body, ["name", "email", "password"]),
    avatar: setupAvatar(req.body.name),
  });
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  const userInfo = { ...omit(user.toObject(), ["password"]), token };

  res.send(formatRes(userInfo));
}

export async function login(req: Request, res: Response) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(20).required().email(),
    password: Joi.string().min(8).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.send(formatRes(null, error.details[0].message, StatusCode.validateFail));
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send(formatRes(null, "user unregistered.", StatusCode.UserUnregister));
  }

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    const result = formatRes(null, "invalid email or password.", StatusCode.InvalidEmailOrPassword);
    return res.send(result);
  }

  const token = user.generateAuthToken();
  const userInfo = { ...omit(user.toObject(), ["password"]), token };

  res.send(formatRes(userInfo));
}
