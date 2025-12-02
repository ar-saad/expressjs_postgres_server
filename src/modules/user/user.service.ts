import { pool } from "../../config/db";

// POST | "/api/v1/users" | Create User
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email } = payload;
  const result = await pool.query(
    `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
    [name, email]
  );
  return result;
};

// GET | "/api/v1/users" | Get All Users
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

// GET | "/api/v1/users/:id" | Get User by ID
const getUserById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

// PUT | "/api/v1/users" | Update a User by ID
const updateUser = async (payload: Record<string, unknown>) => {
  const { name, email, id } = payload;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );
  return result;
};

// DELETE | "/api/v1/users/:id" | Delete User by ID
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
