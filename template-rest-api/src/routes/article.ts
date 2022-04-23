import express from "express";
import auth from "@/middleware/auth";
import adminAuth from "@/middleware/adminAuth";
import * as articleService from "@/services/article";

const router = express.Router();

router.post("/", [auth], articleService.createArticle);

router.put("/:id", [auth], articleService.updateArticle);

router.get("/:id", articleService.readArticle);

router.get("/", articleService.readArticles);

router.delete("/:id", [auth, adminAuth], articleService.deleteArticle);

export default router;
