import { StatusCode } from "@/enums/statusCode";
import { formatRes } from "@/utils/common";
import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.send(formatRes(null, "server error", StatusCode.ServerError));
}
