import config from "config";
import { errorRes } from "@/utils/response";
import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types/user";

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  if (!config.get("requiresAuth")) {
    return next();
  }

  if (!req.user?.isAdmin) {
    return res.send(errorRes(40005));
  }

  next();
}
