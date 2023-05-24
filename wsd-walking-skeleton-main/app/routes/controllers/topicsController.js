import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async ( request, user ) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name : params.get("topic-name"),
    allTopics : await topicsService.listTopics(),
    isAdmin : await topicsService.isAdmin(user.id),
  };
};

const addTopic = async ({ request, response, render, user }) => {
  const topicData = await getTopicData(request, user);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    topicData.errors = errors;
    topicData.message = "Your topic name must be unique and have at least one character";
    render("topicsList.eta", topicData);
    return;
  } else {
    const nameisUnique = await topicsService.uniqueName(topicData.name);
    if (nameisUnique) {
      await topicsService.addTopic(user.id, topicData.name);
      return response.redirect("/topics");
    } else {
      topicData.message = "Your topic name must be unique and have at least one character";
      render("topicsList.eta", topicData);
      return;
    }
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
