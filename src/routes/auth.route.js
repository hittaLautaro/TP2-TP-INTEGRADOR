import AuthController from "../controllers/auth.controller.js";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
  }

  startRoutes() {
    this.router.post("/login", this.authController.login);
    this.router.post("/signup", this.authController.signup);
    this.router.post("/logout", verifyToken, this.authController.logout);
    return this.router;
  }
}

export default Router;
