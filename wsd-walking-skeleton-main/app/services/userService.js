import { sql } from "../database/database.js";

// Add a user to the database
const addUser = async (email, password) => {
  return await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`;
};

// Find the users with given email 
const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows;
};

export { addUser, findUserByEmail };