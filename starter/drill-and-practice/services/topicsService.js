import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  return await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

// Check if the name is unique
const uniqueName = async (name) => {
  const row = await sql`SELECT id FROM topics WHERE name = ${name}`;
  if (row && row.length > 0) {
    return false;
  } else {
    return true;
  }
};

// List all topics in alphabetical order
const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;
  return rows;
};

// Delete the topic with id and all its related questions and options and answers
const deleteTopic = async (userId, id) => {
  if (isAdmin(userId)){
  // Return a list of ID numbers
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; 

  // For each question id, delete the answer and options from the database
  for (let i=0; i < questionIDs.length; i++) {
    await sql`DELETE FROM question_answers WHERE question_id = ${questionIDs[i].id}`;
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionIDs[i].id}`;
  } 
  // Delete the questions with topic id
  await sql`DELETE FROM questions WHERE topic_id = ${id}`;
  // Delete the topic
  return await sql`DELETE FROM topics WHERE id = ${id}`;
  }
};

// Check if the user is admin 
const isAdmin = async (userId) => {
  const row = await sql`SELECT admin AS admin FROM users WHERE id = ${userId}`;
  return row[0].admin;
};

export {
  addTopic,
  uniqueName,
  listTopics,
  deleteTopic,
  isAdmin
};
