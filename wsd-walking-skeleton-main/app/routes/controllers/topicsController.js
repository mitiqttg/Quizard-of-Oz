import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
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
    topicData.validationErrors = errors;
    render("topicsList.eta", topicData);
  } else {
    await topicsService.addTopic(user.id, topicData.name);
    return response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response }) => {
  await topicsService.deleteTopic(params.id);
  return response.redirect("/topics");
};

const listTopics = async ({ render, user }) => {
  render("topicsList.eta", {
    allTopics: await topicsService.listTopics(),
    isAdmin: await topicsService.isAdmin(user.id),
  });
};

export { 
  addTopic, 
  deleteTopic, 
  listTopics 
};
