import { sql } from "../database/database.js";

const randomQuestionID = async (tId) => {
    const rows = await sql`SELECT id FROM questions WHERE topic_id =${tId} ORDER BY RAND() LIMIT 1`;

    return rows[0];
};

const showQuiz = async (tId,qId) => {
    const questionText = await sql`SELECT question_text FROM questions WHERE question_id =${qId}`;

    const ans = await sql`SELECT (id, option_text, is_correct) FROM question_answer_options WHERE question_id =${qId}`;
    
    const data = {
        "topicId": tId,
        "questionId": qId,
        "questionText": questionText,
        "answerOptions": ans
    };
    return data;
};

const isCorrect = async (qId, oId) => {
    return await sql`SELECT is_correct FROM questions_answer_options WHERE question_id =${qId} AND id =${oId}`;
}; 

const correctOptions = async (qId) => {
    return await sql`SELECT option_text FROM questions_answer_options WHERE question_id =${qId} AND is_correct = TRUE`;
}; 

const listAvailableTopics = async () => {
    const rows = await sql`SELECT * FROM topics`;
    return rows;
};

export { 
    showQuiz,
    correctOptions, 
    randomQuestionID,
    isCorrect, 
    listAvailableTopics 
};