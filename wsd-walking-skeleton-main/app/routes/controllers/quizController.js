import * as quizzesService from "../../services/quizzesService.js";

const chooseOption = async ({ params, response, render }) => {
  const tId = params.tId;
  const qId = params.qId;
  const oId = params.oId;
  const correctness = await quizzesService.isCorrect(qId, oId);
  await quizzesService.recordOption(user.id, qId, oId);
  if (correctness[0]) {
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
  //response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const randomQuizOfTopic = async ({ params, response, render }) => {
  const qId = await quizzesService.randomQuestionID(params.tId);
  const tId = params.tId;
  console.log(qId);
  console.log(tId);
  if (qId < 0) {
    render("quizTopics.eta", {
      allTopics: await quizzesService.listAvailableTopics(),
      message: "This topic does not have any available questions.",
    });
    return;
  }
  response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const randomQuizAPI = async ({ params, response }) => {
  const tId = await quizzesService.randomTopicID();
  const qId = await quizzesService.randomQuestionID(tId);
  response.body = await quizzesService.showQuiz(tId,qId);
};

// const verifyAnswer = async ({response}) => {
//   const body = request.body({ type: "json" });
//   const document = await body.value;
//   const validate = await quizzesService.isCorrect(document.questionId, document.optionId);
//   response.body = { correct: validate };  
// };

const goQuiz = async ({ params, render }) => {
  const tId = params.tId;
  const qId = params.qId;
  render("quizRandom.eta", await quizzesService.showQuiz(tId, qId) );
};

const listQuizTopics = async ({ render }) => {
  render("quizTopics.eta", {
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
  incorrectOption,
  randomQuizAPI
};