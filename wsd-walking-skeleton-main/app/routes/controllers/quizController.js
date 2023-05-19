import * as quizzesService from "../../services/quizzesService.js";

const chooseOption = async ({ params, response, render }) => {
  const tId = params.tId;
  const qId = params.qId;
  const oId = params.oId;
  const correctness = await quizzesService.isCorrect(qId, oId);
  if (correctness) {
    response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
  } else {
    response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
  }
  // if (correctness) {
  //   render("quizCorrect.eta", {
  //     tId: tId,
  //   });
  // } else {
  //   render("quizIncorrect.eta", {
  //     tId: tId,
  //     correctOptions: await quizzesService.correctOptions(qId),
  //   });
  // }
  response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const randomQuizOfTopic = async ({ params, response }) => {
  const qId = await quizzesService.randomQuestionID(params.tId);
  const tId = params.tId;
  response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const goQuiz = async ({ params, render }) => {
  const tId = params.tId;
  const qId = params.qId;
  render("quizRandom.eta", {
    quizData: await quizzesService.showQuiz(tId, qId),
  });
};

const listQuizTopics = async ({ render }) => {
  render("quiz.eta", {
    allTopics: await quizzesService.listAvailableTopics(),
  });
};

const correctOption = async ({ render, params }) => {
  const tId = params.tId;
  render("quizCorrect.eta", {
    tId: tId,
  });
};

const incorrectOption = async ({ render, params }) => {
  const tId = params.tId;
  const qId = params.qId;
  render("quizIncorrect.eta", {
    tId: tId,
    correctOptions: await quizzesService.correctOptions(qId),
  });
};

export { 
  randomQuizOfTopic, 
  chooseOption, 
  goQuiz, 
  listQuizTopics,
  correctOption,
  incorrectOption 
};