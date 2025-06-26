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
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    return {
      token: generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      }),
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
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      ...rest,
      password: hashedPassword,
    };

    const createdUser = await this.userModel.save(newUser);

    return createdUser;
  };
}

export default AuthService;
