import { Router } from "../deps.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";

import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.get("/topics/:id", topicsController.goTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:id/questions/:qId/options", questionController.addOption);
router.post("/topics/:tid/questions/:qId/options/:oId/delete", questionController.deleteOption);

router.get("/quiz", quizController.listQuizzes);
router.get("/quiz/:tId", quizController.showRandomQuiz);
router.get("/quiz/:tId/questions/:qId", quizController.goQuiz);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.chooseOption);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctOption);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/api/questions/random", questionApi.randomSelectedQuestion);
router.post("/api/questions/answer", questionApi.verifyAnswer);

router.get("/auth", mainController.showMain);
router.get("/api", mainController.showMain);

export { router };