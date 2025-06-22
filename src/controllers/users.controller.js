import UsersService from "../services/users.service.js";
import usersValidation from "../utils/users.validation.js";

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.usersService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  };

  postUser = async (req, res) => {
    try {
      const newUser = req.body;

      if (!newUser) {
        return res.status(400).json({ error: "User data is required" });
      }

      const validation = usersValidation.schema.validate(newUser);

      if (validation.error) {
        return res.status(400).json({ error: "User has invalid fields" });
      }

      const createdUser = await this.usersService.postUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating user" });
    }
  };

  patchUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;

      if (!updatedUser) {
        return res.status(400).json({ error: "User data is required" });
      }

      const validation = usersValidation.optionalSchema.validate(updatedUser);

      if (validation.error) {
        return res.status(400).json({ error: "User has invalid fields" });
      }

      const result = await this.usersService.patchUser(id, updatedUser);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating user" });
    }
  };

  putUser = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;

      if (!updatedUser) {
        return res.status(400).json({ error: "User data is required" });
      }

      const validation = usersValidation.schema.validate(updatedUser);

      if (validation.error) {
        return res
          .status(400)
          .json({ error: "User has invalid or missing fields" });
      }

      const result = await this.usersService.putUser(id, updatedUser);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating/put user" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.usersService.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  };
}

export default UsersController;
