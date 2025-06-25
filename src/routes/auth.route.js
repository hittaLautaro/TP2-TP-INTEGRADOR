import AuthController from "../controllers/auth.controller.js";
import express from "express";

class Router {
  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
  }

  startRoutes() {
    this.router.post("/login", this.authController.login);
    this.router.post("/signup", this.authController.signup);
    return this.router;
  }
}

export default Router;
