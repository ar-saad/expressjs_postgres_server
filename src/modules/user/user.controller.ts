import { Request, Response } from "express";
import { userService } from "./user.service";

// POST | "/api/v1/users" | Create User
const createUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
    };
    const result = await userService.createUser(payload);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "There is an error",
      error,
    });
  }
};

// GET | "/api/v1/users" | Get All Users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();

    res.status(200).json({
      success: true,
      message: "Found all users",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There is an error",
      error,
    });
  }
};

// GET | "/api/v1/users/:id" | Get User by ID
const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserById(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There is an error",
      error,
    });
  }
};

// PUT | "/api/v1/users" | Update a User by ID
const updateUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      id: req.params.id as string,
    };
    const result = await userService.updateUser(payload);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "There is an error",
      error,
    });
  }
};

// DELETE | "/api/v1/users/:id" | Delete User by ID
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There is an error",
      error,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
