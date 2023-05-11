import { sql } from "../database/database.js";

const randomQuestionID = async (tId) => {
    const rows = await sql`SELECT id FROM questions WHERE topic_id =${tId} ORDER BY RAND() LIMIT 1`;

    return rows[0];
};

const randomSelectedQuestion = async () => {
    const [questionId, questionText] = await sql`SELECT (id,question_text) FROM questions ORDER BY RAND() LIMIT 1`;
    const [optionId,optionText] = await sql`SELECT (id,option_text) FROM questions WHERE question_id =${questionId}`;
};

const listQuestions = async (tId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id =${tId}`;
    return rows;
};

const listAvailableTopics = async () => {
    const rows = await sql`SELECT * FROM topics`;
    return rows;
};

  
export { randomQuestionID, 
    listQuestions, 
    randomSelectedQuestion, 
    listAvailableTopics };