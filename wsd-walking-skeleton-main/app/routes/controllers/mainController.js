import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render, user }) => {
  const totalTopics = await statisticsService.totalTopics();
  const totalQuestions = await statisticsService.totalQuestions();
  const totalAnswers = await statisticsService.totalAnswers();
  
  render("main.eta", {
    totalTopics: totalTopics,
    totalQuestions: totalQuestions,
    totalAnswers: totalAnswers,
  });
};
  
export { showMain };