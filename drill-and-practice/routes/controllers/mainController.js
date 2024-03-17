import * as statisticsService from "../../services/statisticsService.js";

// This function shows main page of the application and statistics parameters
const showMain = async ({ render, user }) => {
  const totalTopics = await statisticsService.totalTopics();
  const totalQuestions = await statisticsService.totalQuestions();
  const totalAnswers = await statisticsService.totalAnswers();
  const totalUsers = await statisticsService.totalUsers();
  
  render("main.eta", {
    totalTopics: totalTopics,
    totalQuestions: totalQuestions,
    totalAnswers: totalAnswers,
    totalUsers: totalUsers,
    user: user,
  });
};
  
export { showMain };