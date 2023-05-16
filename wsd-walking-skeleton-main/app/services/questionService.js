import { sql } from "../database/database.js";


const addOption = async (qId,text) => {
  return await sql`INSERT INTO question_answer_options (question_id, option_text) VALUES (${qId}, ${text})`;
};

const listOptions = async (qId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id= ${qId} ORDER BY name ASC`;

  return rows;
};

const deleteOption = async (id) => {
  await sql`DELETE * FROM topics WHERE id = ${id}`;
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; //return a list of ID numbers
  await sql`DELETE * FROM questions WHERE topic_id = ${id}`;

  questionIDs[0].forEach(id => {
    sql`DELETE * FROM question_answer_options WHERE question_id = ${id}`;
    sql`DELETE * FROM question_answers WHERE question_id = ${id}`;
  });
};

const listQuestions = async (params) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${params.topic_id}`;

  return rows[0];
};

export {
  addOption,
  listOptions,
  deleteOption,
  listQuestions,
};
