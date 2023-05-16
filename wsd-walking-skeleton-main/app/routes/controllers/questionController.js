import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};

const addQuestion = async ({ request, response, render, user }) => {
    const questionData = await getQuestionData(request);

    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        choreData.validationErrors = errors;
        render("topicQuestions.eta", questionData);
    } else {
        await questionService.addQuestion(
            user.id,
            questionData.name,
        );

        response.redirect("/topics/<%=  %>");
    }
};

const deleteTopic = async ({ params, response, user }) => {
    await topicsService.deleteTopic(params.id, user.id);

    response.redirect("/topics");
};

const listQuestions = async ({ render }) => {
    render("topicQuestions.eta", {
        allQuestions: await questionService.listQuestions(),
        isAdmin: await topicsService.isAdmin(),
    });
};

const addOption = async ({ params, response, user }) => {};
const listOptions = async ({ params, response, user }) => {};
const deleteOption = async ({ params, response, user }) => {};

export { addQuestion, deleteTopic, listQuestions };