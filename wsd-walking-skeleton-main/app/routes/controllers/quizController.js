import * as choreService from "../../services/topicsService.js";
import * as choreService from "../../services/quizzesService.js";

const getQuizData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    description: params.get("description"),
    chorecoins: params.get("chorecoins"),
    due_date: params.get("due_date"),
  };
};

const showRandomQuiz = async ({ params, response, user }) => {
  await quizzesService.randomQuestionID(params.id, user.id);

  response.redirect("/chores");
};

const goQuiz = async ({ params, response }) => {
    const tId = params.tId;
    const qId = quizzesService.randomQuestionID;
    response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const listTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await quizzesService.listAvailableTopics(),
  });
};

export { addChore, claimChore, goQuiz, listTopics };