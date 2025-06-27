import jwt from "jsonwebtoken";
import UsersFactory from "../models/UsersFactory.js";

export const verifyToken = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const usersModel = UsersFactory.create(process.env.PERSISTENCE);
    const user = await usersModel.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    if (!user.isActive) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign(user, jwtSecret, {
    expiresIn: "30m",
  });
};
