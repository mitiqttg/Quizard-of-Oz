import * as quizzesService from "../../services/quizzesService.js";

const randomSelectedQuestion = async ({ response }) => {
  const rows = await quizzesService.randomSelectedQuestion();

  if (rows.length > 0) {
    response.body = rows;
  } else {
    response.body = {};
  }
};

export { randomSelectedQuestion };