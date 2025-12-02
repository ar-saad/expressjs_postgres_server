import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

// POST | "/api/v1/todos" | Create Todo
router.post("/", todoController.createTodo);
// GET | "/api/v1/todos" | Get All Todos
router.get("/", todoController.getTodos);
// GET | "/api/v1/todos/:id" | Get Todo by ID
router.get("/:id", todoController.getTodoById);
// PUT | "/api/v1/todos/:id" | Update a Todo by ID
router.put("/:id", todoController.updateTodo);
// DELETE | "/api/v1/todos/:id" | Delete Todo by ID
router.delete("/:id", todoController.deleteTodo);

export const todoRoute = router;
