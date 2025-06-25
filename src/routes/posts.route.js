import PostsController from "../controllers/posts.controller.js";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.postsController = new PostsController();
  }

  startRoutes() {
    this.router.get("/", verifyToken, this.postsController.getPosts);
    this.router.get("/me", verifyToken, this.postsController.getPostsByUser);
    this.router.get("/:id", verifyToken, this.postsController.getPost);

    this.router.post("/", verifyToken, this.postsController.postPost);
    this.router.put("/:id", verifyToken, this.postsController.putPost);
    this.router.patch("/:id", verifyToken, this.postsController.patchPost);
    this.router.delete("/:id", verifyToken, this.postsController.deletePost);

    return this.router;
  }
}

export default Router;
