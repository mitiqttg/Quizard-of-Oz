import { sql } from "../database/database.js";

const randomQuestionID = async (tId) => {
    const rows = await sql`SELECT id FROM questions WHERE topic_id =${tId} ORDER BY RAND() LIMIT 1`;

    return rows[0];
};

const randomSelectedQuestion = async () => {
    const questionId = await sql`SELECT id FROM questions ORDER BY RAND() LIMIT 1`;
    const questionText = await sql`SELECT question_text FROM questions WHERE question_id =${questionId}`;
    // const optionId = await sql`SELECT id FROM question_answer_options WHERE question_id =${questionId}`;
    // const optionText = await sql`SELECT option_text FROM question_answer_options WHERE question_id =${questionId}`;
    // = [optionId,optionText] 
    const ans = await sql`SELECT (id,option_text) FROM question_answer_options WHERE question_id =${questionId}`;
    const arr = [];
    ans.forEach((id,text) => {
        arr.push(`{"optionId": ${id}, "optionText": ${text}}`)
    });
    const data = {
        "questionId": questionId[0],
        "questionText": questionText[0],
        "answerOptions": arr
    };
    return data;
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