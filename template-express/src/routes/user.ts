import express from "express";
import * as userService from "@/services/user";

const router = express.Router();

router.post("/login", userService.login);

router.post("/signup", userService.signup);

export default router;
