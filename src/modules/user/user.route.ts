import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// POST | "/api/v1/users" | Create User
router.post("/", userController.createUser);
// GET | "/api/v1/users" | Get All Users
router.get("/", auth("admin"), userController.getUsers);
// GET | "/api/v1/users/:id" | Get User by ID
router.get("/:id", userController.getUserById);
// PUT | "/api/v1/users" | Update a User by ID
router.put("/:id", userController.updateUser);
// DELETE | "/api/v1/users/:id" | Delete User by ID
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
