import * as choreService from "../../services/topicsService.js";
import * as choreService from "../../services/quizzesService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  description: [validasaur.required, validasaur.minLength(1)],
  chorecoins: [validasaur.required, validasaur.isNumeric],
  due_date: [validasaur.required, validasaur.isDate],
};

const getChoreData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    description: params.get("description"),
    chorecoins: params.get("chorecoins"),
    due_date: params.get("due_date"),
  };
};

const addChore = async ({ request, response, render, user }) => {
  const choreData = await getChoreData(request);

  const [passes, errors] = await validasaur.validate(
    choreData,
    choreValidationRules,
  );

  if (!passes) {
    console.log(errors);
    choreData.validationErrors = errors;
    render("chores.eta", choreData);
  } else {
    await choreService.addChore(
      user.id,
      choreData.title,
      choreData.description,
      choreData.chorecoins,
      choreData.due_date,
    );

    response.redirect("/chores");
  }
};

const claimChore = async ({ params, response, user }) => {
  await choreService.claimChore(params.id, user.id);

  response.redirect("/chores");
};

const goQuiz = async ({ params, response }) => {
    const tId = params.id;
    const qId = quizzesService.randomQuestionID;
    response.redirect(`/quiz/${tId}/questions/${qId}`);
};

const listTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await quizzesService.listAvailableTopics(),
  });
};

export { addChore, claimChore, goQuiz, listTopics };