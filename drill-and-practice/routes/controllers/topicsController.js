import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

// Minimum length required for topic's name
const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

// Retrieves topic data from the input form
const getTopicData = async ( request, user ) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name : params.get("name").trimEnd(),
    allTopics : await topicsService.listTopics(),
    isAdmin : await topicsService.isAdmin(user.id),
    user: user,
  };
};

// Add the topic to the database
const addTopic = async ({ request, response, render, user }) => {
  if (user.admin) {
    const topicData = await getTopicData(request, user);
    // Validate topic
    const [passes, errors] = await validasaur.validate(
      topicData,
      topicValidationRules,
    );
    
    // If the topic meets the length requirement, check if the name is unique,
    // if it is, add the topic to the database and reload topics list page,
    // otherwise, return the error message  
    if (!passes) {
      topicData.errors = errors;
      topicData.message = "Your topic name must be unique and have at least one character";
      return render("topicsList.eta", topicData);
    } else {
      const nameisUnique = await topicsService.uniqueName(topicData.name).trimEnd();
      if (nameisUnique) {
        await topicsService.addTopic(user.id, topicData.name);
        return response.redirect("/topics");
      } else {
        topicData.message = "Your topic name must be unique and have at least one character";
        return render("topicsList.eta", topicData);
      }
    }
  } 
  response.redirect("/topics");
};

// Delete the topic with id
const deleteTopic = async ({ params, response, user }) => {
  if (await topicsService.isAdmin(user.id)) {
    await topicsService.deleteTopic(user.id, params.id);
    return response.redirect("/topics");
  }
  return response.redirect("/topics");
};

// List all the topics 
const listTopics = async ({ render, user }) => {
  render("topicsList.eta", {
    allTopics: await topicsService.listTopics(),
    isAdmin: user.admin,
    user: user,
  });
};

export { 
  addTopic, 
  deleteTopic, 
  listTopics 
};
