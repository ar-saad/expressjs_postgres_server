import { Request, Response } from "express";
import { todoService } from "./todo.service";

// POST | "/api/v1/todos" | Create Todo
const createTodo = async (req: Request, res: Response) => {
  try {
    const payload = {
      user_id: req.body.user_id,
      title: req.body.title,
    };

    const result = await todoService.createTodo(payload);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
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

// GET | "/api/v1/todos" | Get All Todos
const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getTodos();

    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
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

// GET | "/api/v1/todos/:id" | Get Todo by ID
const getTodoById = async (req: Request, res: Response) => {
  try {
    const result = await todoService.getTodoById(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
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

// PUT | "/api/v1/todos/:id" | Update a Todo by ID
const updateTodo = async (req: Request, res: Response) => {
  try {
    const payload = {
      title: req.body.title,
      id: req.params.id as string,
    };

    const result = await todoService.updateTodo(payload);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
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

// DELETE | "/api/v1/todos/:id" | Delete Todo by ID
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodo(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
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

export const todoController = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
