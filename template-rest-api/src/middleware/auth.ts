import jwt from "jsonwebtoken";
import config from "config";
import { StatusCode } from "@/enums/statusCode";
import { formatRes } from "@/utils";
import { Response, NextFunction } from "express";
import { AuthRequest, User } from "@/types/user";

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  if (!config.get("requiresAuth")) {
    return next();
  }

  const token = req.header("Authorization");
  if (!token) {
    return res.send(formatRes(null, "token not found", StatusCode.TokenNotFound));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")) as User;
    req.user = decoded;
    next();
  } catch (e) {
    res.send(formatRes(null, "invalid token", StatusCode.InvalidToken));
  }
}
