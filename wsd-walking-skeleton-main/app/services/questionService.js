import { sql } from "../database/database.js";

const addOption = async (userId,name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};


const listOptions = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;

  return rows[0];
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


export {
    addOption,
    listOptions,
    deleteOption,
};
