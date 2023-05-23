import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  return await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;
  return rows;
};

const deleteTopic = async (id) => {
  //return a list of ID numbers
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; 
  console.log(questionIDs);
  for (let i=0; i < questionIDs.length; i++) {
    console.log(questionIDs[i].id);
    console.log(typeof(questionIDs[i].id));
    console.log(typeof(Object.values(questionIDs[i])));
    await sql`DELETE FROM question_answers WHERE question_id = ${questionIDs[i].id}`;
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionIDs[i].id}`;
  }
  await sql`DELETE FROM questions WHERE topic_id = ${id}`;
  return await sql`DELETE FROM topics WHERE id = ${id}`;
};

const isAdmin = async (userId) => {
  const row = await sql`SELECT admin AS admin FROM users WHERE id = ${userId}`;
  return row[0].admin;
};

export {
  addTopic,
  listTopics,
  deleteTopic,
  isAdmin
};
