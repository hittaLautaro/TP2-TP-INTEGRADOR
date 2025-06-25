import AuthService from "../services/auth.service.js";
import authValidation from "../utils/auth.validation.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const loginReq = req.body;

      if (!loginReq) {
        return res.status(400).json({ error: "User data is required" });
      }

      const validation = authValidation.loginSchema.validate(loginReq);

      if (validation.error) {
        return res.status(400).json({ error: "User has invalid fields" });
      }

      const response = await this.authService.login(loginReq);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error logging in" });
    }
  };

  signup = async (req, res) => {
    try {
      const newUser = req.body;

      if (!newUser) {
        return res.status(400).json({ error: "User data is required" });
      }

      const validation = authValidation.signupSchema.validate(newUser);

      if (validation.error) {
        return res.status(400).json({ error: "User has invalid fields" });
      }

      const createdUser = await this.authService.signup(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: error.message || "Error signing up" });
    }
  };
}

export default AuthController;
