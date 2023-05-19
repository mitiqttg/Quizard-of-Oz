import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  return await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;

  return rows;
};

const deleteTopic = async (id, user_id) => {
  //return a list of ID numbers
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; 
  for (qId in questionIDs[0]) {
    await sql`DELETE * FROM question_answer_options WHERE question_id = ${qid}`;
    await sql`DELETE * FROM question_answers WHERE question_id = ${qid}`;
  }
  await sql`DELETE * FROM topics WHERE id = ${id}`;
  await sql`DELETE * FROM questions WHERE topic_id = ${id}`;
};

const isAdmin = async (userId) => {
  const row = await sql`SELECT admin FROM users WHERE id = ${userId}`;
  return row[0];
};

export {
  addTopic,
  listTopics,
  deleteTopic,
  isAdmin
};
