import { sql } from "../database/database.js";

const totalTopics = async () => {
  const rows = await sql`SELECT COUNT(id) FROM topics`;

  return rows[0];
};

const totalQuestions = async () => {
  const rows = await sql`SELECT COUNT(id) FROM questions`;

  return rows[0];
};

const totalAnswers = async () => {
  const rows = await sql`SELECT COUNT(id) FROM question_answers `;

  return rows[0];
};

export { 
  totalTopics, 
  totalAnswers, 
  totalQuestions
};