import { sql } from "../database/database.js";

const totalTopics = async () => {
  const rows = await sql`SELECT COUNT(id) FROM topics`;

  return rows[0];
};

const totalQuestions = async () => {
  const rows = await sql`SELECT COUNT(id) FROM questions`;

  return rows[0];
};

const totalAnswers = async (userId) => {
  const rows = await sql`SELECT COUNT(id) FROM question_answers WHERE user_id = ${userId}`;

  return rows[0];
};

export { 
  totalTopics, 
  totalAnswers, 
  totalQuestions
};