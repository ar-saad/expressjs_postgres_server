import { pool } from "../../config/db";

// POST | "/api/v1/todos" | Create Todo
const createTodo = async (payload: Record<string, unknown>) => {
  const { user_id, title } = payload;
  const result = await pool.query(
    `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
    [user_id, title]
  );
  return result;
};

// GET | "/api/v1/todos" | Get All Todos
const getTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

// GET | "/api/v1/todos/:id" | Get Todo by ID
const getTodoById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
  return result;
};

// PUT | "/api/v1/todos/:id" | Update a Todo by ID
const updateTodo = async (payload: Record<string, unknown>) => {
  const { title, id } = payload;
  const result = await pool.query(
    `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
    [title, id]
  );
  return result;
};

// DELETE | "/api/v1/todos/:id" | Delete Todo by ID
const deleteTodo = async (id: string) => {
  const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
  return result;
};

export const todoService = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
