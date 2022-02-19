import config from "@/config/config";
import { StatusCode } from "@/enums/statusCode";
import { formatRes } from "@/utils/common";
import { Response, NextFunction } from "express";
import { AuthRequest } from "@/types/user";

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  if (!config.isAuth) {
    return next();
  }

  if (!req.user?.isAdmin) {
    return res.send(formatRes(null, "access denied, no permission", StatusCode.NoPermission));
  }

  next();
}
