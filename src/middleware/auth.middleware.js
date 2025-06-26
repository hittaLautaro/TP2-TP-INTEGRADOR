import jwt from "jsonwebtoken";
import UsersFactory from "../models/UsersFactory.js";

export const verifyToken = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const usersModel = UsersFactory.create(process.env.PERSISTENCE);
    const user = await usersModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "User is not logged in" });
    }

    console.log("decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign(user, jwtSecret, {
    expiresIn: "30m",
  });
};
