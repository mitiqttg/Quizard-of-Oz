import * as quizzesService from "../../services/quizzesService.js";

// Select a random question from database 
const randomSelectedQuestion = async ({ response }) => {
  const rows = await quizzesService.randomQuizAPI();
  const ans = rows.answerOptions;

  function myFunction(element) {
    return { "optionId": element.id, "optionText": element.option_text };
  }

  if (rows !== -1) {
    rows.answerOptions = ans.map(myFunction);
    if (rows) {
      return response.body = rows;
    }
  }
  return response.body = {};
};

// Return an object for checking if the answer is correct to the posted data 
// e.g. { "questionId": 1, "optionId": 3 } 
const verifyAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const correctness = await quizzesService.isCorrect(document.questionId, document.optionId);

  return response.body = { correct: correctness };
};

export { randomSelectedQuestion, verifyAnswer };