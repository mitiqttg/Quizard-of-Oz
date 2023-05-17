import * as choreService from "../../services/topicsService.js";
import * as choreService from "../../services/quizzesService.js";

const getQuizData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get(""),
    description: params.get("description"),
    chorecoins: params.get("chorecoins"),
    due_date: params.get("due_date"),
  };
};

const chooseOption = async ({ params, response, user }) => {
  const tId = params.tId;
  const qId = params.qId;
  const oId = params.oId;
  const correctness = await quizzesService.isCorrect(qId, oId);
  if (correctness) {
    render("quizCorrect.eta", {
      tId: tId,
    });
  } else {
    render("quizIncorrect.eta", {
      tId: tId,
      correctOptions: await quizzesService.correctOptions(qId),
    });
  }
  response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const showRandomQuiz = async ({ params, response, user }) => {
  const qId = await quizzesService.randomQuestionID(params.tId, user.id);
  const tId = params.tId;
  response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const goQuiz = async ({ params, response }) => {
    const tId = params.tId;
    const qId = params.qId;
    render("quizRandom.eta", {
      quizData: await quizzesService.showQuiz(tId, qId),
    });
};

const listTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await quizzesService.listAvailableTopics(),
  });
};

export { 
  addChore, 
  showRandomQuiz, 
  chooseOption, 
  goQuiz, 
  listTopics 
};