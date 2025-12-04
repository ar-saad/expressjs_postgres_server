import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.route";
import { todoRoute } from "./modules/todo/todo.route";
import { authRoute } from "./modules/auth/auth.route";

const port = config.port;
export const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded()); // to parse form-data

// Initialize Database
initDB();

// Middleware
app.use(logger); // Initialize Logger middleware

// Router
app.use("/api/v1/users", userRoute);
app.use("/api/v1/todos", todoRoute);
app.use("/api/v1/auth", authRoute);

// Not Found Route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    path: req.path,
  });
});
