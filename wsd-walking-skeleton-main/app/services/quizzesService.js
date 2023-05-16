import { sql } from "../database/database.js";

const randomQuestionID = async (tId) => {
    const rows = await sql`SELECT id FROM questions WHERE topic_id =${tId} ORDER BY RAND() LIMIT 1`;

    return rows[0];
};

const showQuestion = async (tId,qId) => {
    const questionText = await sql`SELECT question_text FROM questions WHERE question_id =${qId}`;

    const ans = await sql`SELECT (id,option_text,is_correct) FROM question_answer_options WHERE question_id =${qId}`;
    
    const data = {
        "topicId": tId,
        "questionId": qId,
        "questionText": questionText[0],
        "answerOptions": ans
    };
    return data;
};

const isCorrect = async (tId) => {

}; 

const listAvailableTopics = async () => {
    const rows = await sql`SELECT * FROM topics`;
    return rows;
};

  
export { showQuestion, 
    randomQuestionID,
    isCorrect, 
    listAvailableTopics };