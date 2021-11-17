import express from "express";
import auth from "@/middleware/auth";
import adminAuth from "@/middleware/adminAuth";
import * as postService from "@/services/post";

const router = express.Router();

router.post("/", [auth], postService.createPost);

router.put("/:id", [auth], postService.updatePost);

router.get("/:id", postService.readPost);

router.post("/query", postService.readPosts);

router.delete("/:id", [auth, adminAuth], postService.deletePost);

export default router;
