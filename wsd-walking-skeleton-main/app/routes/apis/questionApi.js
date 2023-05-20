import * as quizzesService from "../../services/quizzesService.js";

const randomSelectedQuestion = async ({ response }) => {
  const rows = await quizzesService.randomQuizAPI();

  if (rows.length > 0) {
    const questionId = rows.questionId;
    const questionText = rows.questionText;
    const answerOptions = rows.answerOptions.map(element => {
      return {"optionId": element.id, "optionText": element.option_text };
    });
    response.body = {
      "questionId": questionId,
      "questionText": questionText,
      "answerOptions": answerOptions
    };
  } else {
    response.body = {};
  }
};

const verifyAnswer = async ({ response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const validate = await quizzesService.isCorrect(document.questionId, document.optionId);

  response.body = { correct: validate[0] };
};

export { randomSelectedQuestion, verifyAnswer };