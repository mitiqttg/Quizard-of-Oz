import * as quizzesService from "../../services/quizzesService.js";
import * as questionService from "../../services/questionService.js";

// Pick an option
const chooseOption = async ({ params, response, user }) => {
  const tId = params.tId;
  const qId = params.qId;
  const oId = params.oId;
  const correctness = await quizzesService.isCorrect(qId, oId);

  // Record the answer of the user to database
  await quizzesService.recordOption(user.id, qId, oId);

  // If the answer is (in)correct, go to (in)correct page
  if (correctness) {
    response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
  } else {
    response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
  }
};

// Choose a random quiz from the topic
const randomQuizOfTopic = async ({ params, response, render }) => {
  const qId = await quizzesService.randomQuestionID(params.tId);
  const tId = params.tId;
  
  // If the topic doesn't have any question, return a message,
  // otherwise, go to the random picked quiz page
  if (qId < 0) {
    return render("quizTopics.eta", {
      allTopics: await quizzesService.listAvailableTopics(),
      message: "This topic does not have any question.",
    });
  }
  return response.redirect(`/quiz/${tId}/questions/${qId}`);
};

// Go to quiz 
const goQuiz = async ({ params, render }) => {
  const tId = params.tId;
  const qId = params.qId;
  return render("quizRandom.eta", await quizzesService.showQuiz(tId, qId) );
};

// List all the quiz of current topic
const listQuizTopics = async ({ render }) => {
  return render("quizTopics.eta", {
    allTopics: await quizzesService.listAvailableTopics(),
  });
};

// Load correct page if answer is correct
const correctOption = async ({ render, params }) => {
  const tId = params.tId;
  const qId = params.qId;
  return render("quizCorrect.eta", {
    question: await questionService.questionText(tId, qId),
    tId: tId,
    correctOptions: await quizzesService.correctOptions(qId),
  });
};

// Load incorrect page if answer is incorrect
const incorrectOption = async ({ render, params }) => {
  const tId = params.tId;
  const qId = params.qId;
  render("quizIncorrect.eta", {
    question: await questionService.questionText(tId, qId),
    tId: tId,
    correctOptions: await quizzesService.correctOptions(qId),
  });
};

export { 
  randomQuizOfTopic, 
  chooseOption, 
  goQuiz, 
  listQuizTopics,
  correctOption,
  incorrectOption,
};