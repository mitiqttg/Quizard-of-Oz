import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
  // description: [validasaur.required, validasaur.minLength(1)],
  // chorecoins: [validasaur.required, validasaur.isNumeric],
  // due_date: [validasaur.required, validasaur.isDate],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};

const addTopic = async ({ request, response, render, user }) => {
  const topicData = await getTopicData(request);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    choreData.validationErrors = errors;
    render("topicsList.eta", topicData);
  } else {
    await topicsService.addTopic(
      user.id,
      topicData.name,
    );

    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, user }) => {
  await topicsService.deleteTopic(params.id, user.id);

  response.redirect("/topics");
};

const listTopics = async ({ render }) => {
  render("topicsList.eta", {
    totalTopics: await topicsService.listTopics(),
    isAdmin: await topicsService.isAdmin(),
  });
};

export { addTopic, claimChore, deleteTopic, listTopics };