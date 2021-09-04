import { Request } from "express";
import { StringSchema } from "joi";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  isAdmin?: boolean;
}

export interface UserRule {
  password: StringSchema;
  email: StringSchema;
  name?: StringSchema;
}

export interface AuthRequest extends Request {
  user?: User;
}
