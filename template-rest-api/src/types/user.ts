import { Request } from "express";

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  isAdmin?: boolean;
  avatar?: string;
}

export interface AuthRequest extends Request {
  user?: User;
}
