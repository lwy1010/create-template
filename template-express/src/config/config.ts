import { isDevMode } from "@/utils/is";
import dotenv from "dotenv";

const options = {
  path: isDevMode() ? ".env.development" : ".env.production",
};

dotenv.config(options);

export interface Config {
  port: number;
  jwtSecret: string;
  databaseUrl: string;
  isAuth: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || "",
  databaseUrl: process.env.DATABASE_URL || "",
  isAuth: Boolean(process.env.IS_AUTH) || true,
};

export default config;
