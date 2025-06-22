import UsersController from "../controllers/users.controller.js";
import express from "express";

class Router {
  constructor() {
    this.router = express.Router();
    this.usersController = new UsersController();
  }

  startRoutes() {
    this.router.get("/users", this.usersController.getUsers);
    this.router.post("/users", this.usersController.postUser);
    this.router.put("/users/:id", this.usersController.putUser);
    this.router.patch("/users/:id", this.usersController.patchUser);
    this.router.delete("/users/:id", this.usersController.deleteUser);
    return this.router;
  }
}

export default Router;
