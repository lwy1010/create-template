import { UserModel, validateUser } from "@/models/user";
import bcryptjs from "bcryptjs";
import { successRes, errorRes, validateRes } from "@/utils/response";
import { pick, omit } from "lodash";
import { Request, Response } from "express";
import { getAvatarLink } from "@/utils/common";

export async function login(req: Request, res: Response) {
  const { error } = validateUser(req.body, "login");
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.send(errorRes(40001));
  }

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return res.send(errorRes(40001));
  }

  const token = user.generateAuthToken();
  const userInfo = { ...pick(user, ["name", "email", "_id", "isAdmin"]), token };

  res.send(successRes(userInfo));
}

export async function signup(req: Request, res: Response) {
  const { error } = validateUser(req.body);
  if (error) {
    return res.send(validateRes(error.details[0].message));
  }

  let user = await UserModel.findOne({ email: req.body?.email });
  if (user) {
    return res.send(errorRes(4002));
  }

  const commonInfo = { avatar: getAvatarLink(req.body?.name) };

  user = new UserModel({ ...pick(req.body, ["name", "email", "password"]), ...commonInfo });
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  const userInfo = { ...pick(user, ["name", "email", "_id", "isAdmin", "avatar"]), token };

  res.send(successRes(userInfo));
}

/**
 * @description 根据userId获取用户信息
 */
export async function getUserInfo(req: Request, res: Response) {
  const { userId } = req.body;
  if (!userId) {
    res.send(errorRes(40007));
  }
  try {
    const user = await UserModel.findById(userId);
    const userInfo = pick(user, ["name", "email", "_id", "isAdmin"]);
    res.send(successRes(userInfo));
  } catch (error) {
    res.send(successRes({}));
  }
}
