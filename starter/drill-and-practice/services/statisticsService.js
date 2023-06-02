import { sql } from "../database/database.js";

// Return statistical parameters for the main page
const totalTopics = async () => {
  const row = await sql`SELECT COUNT(id) as count FROM topics`;
  if (row && row[0]) {
    return row[0].count;  
  } else return 0;
};

const totalQuestions = async () => {
  const row = await sql`SELECT COUNT(id) as count FROM questions`;
  if (row && row[0]) {
    return row[0].count;  
  } else return 0;
};

const totalAnswers = async () => {
  const row = await sql`SELECT COUNT(id) as count FROM question_answers `;
  if (row && row[0]) {
    return row[0].count;  
  } else return 0;
};

const totalUsers = async () => {
  const row = await sql`SELECT COUNT(id) as count FROM users `;
  if (row && row[0]) {
    return row[0].count;  
  } else return 0;
};

export { 
  totalTopics, 
  totalQuestions,
  totalAnswers,
  totalUsers
};