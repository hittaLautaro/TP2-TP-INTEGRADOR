import AccountController from "../controllers/account.controller.js";
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

class Router {
  constructor() {
    this.router = express.Router();
    this.accountController = new AccountController();
  }

  startRoutes() {
    this.router.delete("/", verifyToken, this.accountController.delete);
    return this.router;
  }
}

export default Router;
