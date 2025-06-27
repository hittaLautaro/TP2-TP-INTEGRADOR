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

      const data = await this.authService.login(loginReq);
      res.status(201).json({ message: "Logged in successfully", data: data });
    } catch (error) {
      if (error.statusCode === 401) {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Error logging in" });
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

      await this.authService.signup(newUser);
      res.status(201).json({ message: "Signed up successfully" });
    } catch (error) {
      if (error.statusCode === 400) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error signing up" });
    }
  };

  logout = async (req, res) => {
    try {
      const result = await this.authService.logout(req.user.id);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error logging out" });
    }
  };
}

export default AuthController;
