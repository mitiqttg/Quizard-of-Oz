import { sql } from "../database/database.js";

// List all the questions of the topic
const listQuestions = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${id}`;
  return rows;
};

// Add a question to the database
const addQuestion = async ( userId, tId, question_text ) => {
  return await sql`INSERT INTO questions (user_id, topic_id, question_text) 
  VALUES (${userId}, ${tId}, ${question_text})`;
};

// Delete a question and its related options and recorded answers
const deleteQuestion = async (qId) => {
  await sql`DELETE FROM question_answers WHERE question_id = ${qId}`;
  await sql`DELETE FROM question_answer_options WHERE question_id = ${qId}`;
  return await sql`DELETE FROM questions WHERE id = ${qId}`;
};

// Return topic name
const topicName = async (tId) => { 
  const row = await sql`SELECT name AS name FROM topics WHERE id = ${tId}`;
  return row[0].name;
};

// Return question text
const questionText = async (tId, qId) => {
  const rows = await sql`SELECT question_text AS text FROM questions WHERE id= ${qId} AND topic_id = ${tId}`;
  return rows[0].text;
};

// Return all options for the given question
const listOptions = async (qId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id= ${qId}`;
  return rows; 
};

// Add an option to the database
const addOption = async (qId, text, correctness) => { 
  return await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) 
  VALUES (${qId}, ${text}, ${correctness})`;
};

// Delete an option
const deleteOption = async (qId, oId) => { 
  await sql`DELETE FROM question_answer_options WHERE question_id = ${qId} AND id = ${oId}`;
};

export { 
  addQuestion,
  topicName,
  listQuestions,
  deleteQuestion,
  questionText,
  addOption,
  listOptions,
  deleteOption
};
