import { sql } from "../database/database.js";

const addTopic = async (userId,name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};


const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;

  return rows;
};

const deleteTopic = async (userId,name) => {
  
};

export {
  addTopic,
  listTopics,
};
