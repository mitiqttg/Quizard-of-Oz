import { sql } from "../database/database.js";

const addUser = async (name, address, email, password) => {
  await sql`INSERT INTO users
      (name, address, email, password)
        VALUES (${name}, ${address}, ${email}, ${password})`;
};

const findUserByEmail = async (email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows;
};

export { addUser, findUserByEmail };