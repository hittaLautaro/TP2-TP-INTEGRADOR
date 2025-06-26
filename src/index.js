import dotenv from "dotenv";
dotenv.config();

import express from "express";
import PostsRouter from "./routes/posts.route.js";
import AccountRouter from "./routes/account.route.js";
import AuthRouter from "./routes/auth.route.js";
import MongoConnection from "./models/connection.js";

const app = express();
const PORT = process.env.PORT;

await MongoConnection.connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", new PostsRouter().startRoutes());
app.use("/auth", new AuthRouter().startRoutes());
app.use("/account", new AccountRouter().startRoutes());

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "Recurso no encontrado.",
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
