import { errorRes } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.send(errorRes(50000));
}
