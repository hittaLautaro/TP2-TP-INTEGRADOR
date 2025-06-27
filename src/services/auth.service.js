import UsersFactory from "../models/UsersFactory.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.middleware.js";

class AuthService {
  constructor() {
    this.userModel = UsersFactory.create(process.env.PERSISTENCE);
  }

  login = async ({ email, password }) => {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    await this.userModel.updateActive(user._id.toString(), true);

    return {
      token: token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  };

  signup = async (signupReq) => {
    const { email, password, ...rest } = signupReq;

    const user = await this.userModel.findByEmail(email);

    if (user) {
      const error = new Error("User with that email already exists");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      ...rest,
      password: hashedPassword,
      isActive: false,
    };

    const createdUser = await this.userModel.save(newUser);

    return createdUser;
  };

  logout = async (userId) => {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userModel.updateActive(user._id.toString(), false);

    return user;
  };
}

export default AuthService;
