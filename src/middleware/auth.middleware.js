import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    jwtSecret,
    {
      expiresIn: "30m",
    }
  );
};
