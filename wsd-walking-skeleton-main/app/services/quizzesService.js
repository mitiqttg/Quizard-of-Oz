import { sql } from "../database/database.js";

// Pick a random topic id
const randomTopicID = async () => {
    const row = await sql`SELECT id AS id FROM topics ORDER BY RANDOM() LIMIT 1`;
    if (row && row[0]) {
        return row[0].id;
    } else return -1;
};


// Pick a random question id from the topic
const randomQuestionID = async (tId) => {
    const row = await sql`SELECT id AS id FROM questions WHERE topic_id =${tId} ORDER BY RANDOM() LIMIT 1`;
    if (row && row[0]) {
        return row[0].id;
    } else return -1;
};

// Return the quiz data
const showQuiz = async (tId, qId) => {
    const questionText = await sql`SELECT question_text AS text FROM questions WHERE topic_id = ${tId} AND id =${qId}`;
    const ans = await sql`SELECT * FROM question_answer_options WHERE question_id =${qId}`;
    return {
        "topicId": tId,
        "questionId": qId,
        "questionText": questionText[0].text,
        "answerOptions": ans,
    };
};

// Choose a random quiz from database, and return it as an object
// THIS FUNCTION IS FOR API
const randomQuizAPI = async () => {
    const tId = await randomTopicID();
    console.log(tId);
    if (tId > 0) {
        const qId = await randomQuestionID(tId);
        console.log(qId);
        if (qId > 0) {
            const questionText =
            await sql`SELECT question_text AS text FROM questions WHERE topic_id = ${tId} AND id =${qId}`;
            console.log(questionText);
            const ans =
            await sql`SELECT * FROM question_answer_options WHERE question_id =${qId}`;
            console.log(ans);
            if (ans && ans.length > 0) {
            return {
              "questionId": qId,
              "questionText": questionText[0].text,
              "answerOptions": ans,
            };
          }
        }
    }
    return -1;
};

// Check if the option of the question is correct, return BOOLEAN value
// THIS FUNCTION IS ALSO FOR API
const isCorrect = async (qId, oId) => {
    const row = await sql`SELECT is_correct AS correct FROM question_answer_options WHERE id =${oId} AND question_id =${qId} `;
    if (row && row.length > 0) {
        return row[0].correct;
    } 
    return false;
}; 

// Return all correct options for the given question
const correctOptions = async (qId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id =${qId} AND is_correct = TRUE`;
}; 

// Show all topics
const listAvailableTopics = async () => {
    return await sql`SELECT * FROM topics`;
};

// Add the answer of the user to database
const recordOption = async (userId, qId, oId) => {
    return await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${qId}, ${oId})`;
};

export { 
    showQuiz,
    correctOptions, 
    randomTopicID,
    randomQuestionID,
    isCorrect, 
    listAvailableTopics,
    recordOption,
    randomQuizAPI
};