import { sql } from "../database/database.js";

const randomTopicID = async () => {
    const row = await sql`SELECT id AS id FROM topics ORDER BY RANDOM() LIMIT 1`;
    if (row && row[0]) {
        return row[0].id;
    } else return -1;
};

const randomQuestionID = async (tId) => {
    const row = await sql`SELECT id AS id FROM questions WHERE topic_id =${tId} ORDER BY RANDOM() LIMIT 1`;
    if (row && row[0]) {
        return row[0].id;
    } else return -1;
};

const showQuiz = async (tId, qId) => {
    const questionText = await sql`SELECT question_text AS text FROM questions WHERE topic_id = ${tId} AND id =${qId}`;
    const ans = await sql`SELECT (id, option_text, is_correct) FROM question_answer_options WHERE question_id =${qId}`;
    return {
        "topicId": tId,
        "questionId": qId,
        "questionText": questionText[0].text,
        "answerOptions": ans,
    };
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

const recordOption = async (userId, qId, oId) => {
    return await sql`INSERT INTO questions_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${qId}, ${oId})`;
};

export { 
    showQuiz,
    correctOptions, 
    randomTopicID,
    randomQuestionID,
    isCorrect, 
    listAvailableTopics,
    recordOption 
};