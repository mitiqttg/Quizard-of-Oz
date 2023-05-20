import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  const totalTopics = await statisticsService.totalTopics();
  const totalQuestions = await statisticsService.totalQuestions();
  const totalAnswers = await statisticsService.totalAnswers();
  const totalUsers = await statisticsService.totalUsers();
  
  render("main.eta", {
    totalTopics: totalTopics,
    totalQuestions: totalQuestions,
    totalAnswers: totalAnswers,
    totalUsers: totalUsers,
  });
};
  
export { showMain };