import * as quizzesService from "../../services/quizzesService.js";

// Select a random question from database 
const randomSelectedQuestion = async ({ response }) => {
  const rows = await quizzesService.randomQuizAPI();
  console.log(rows);
  console.log(rows.length);
  const ans = rows.answerOptions;
  console.log(ans);
  console.log(typeof(ans));
  function myFunction(element) {
    return {"optionId": element.id, "optionText": element.option_text };
  }
  rows.answerOptions =  ans.map(myFunction);
  response.body = rows ? rows : {};
};

// Return an object for checking if the answer is correct to the posted data 
// e.g. { "questionId": 1, "optionId": 3 } 
const verifyAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const validate = await quizzesService.isCorrect(document.questionId, document.optionId);

  return response.body = { correct: validate };
};

export { randomSelectedQuestion, verifyAnswer };