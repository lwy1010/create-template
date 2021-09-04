import jwt from "jsonwebtoken";
import config from "config";
import { errorRes } from "@/utils/response";
import { Response, NextFunction } from "express";
import { AuthRequest, User } from "@/types/user";

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  if (!config.get("requiresAuth")) {
    return next();
  }

  const token = req.header("auth-token");
  if (!token) {
    return res.send(errorRes(40006));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")) as User;
    req.user = decoded;
    next();
  } catch (e) {
    res.send(errorRes(40004));
  }
}
