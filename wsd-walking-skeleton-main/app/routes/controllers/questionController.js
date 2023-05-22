import * as topicsService from "../../services/topicsService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        question_text: params.get("question_text"),
    };
};

const listQuestions = async ({ render, params, user }) => {
    render("topicQuestions.eta", {
        tId: params.tId,
        topicName: await questionService.topicName(params.tId),
        allQuestions: await questionService.listQuestions(params.tId),
        isAdmin: await topicsService.isAdmin(user.id),
    });
};

const addQuestion = async ({ request, response, render, user, params }) => {
    const questionData = await getQuestionData(request);
    
    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules,);
        
    if (!passes) {
        console.log(errors);
        questionData.errors = errors;
        render("topicQuestions.eta", questionData);
    } else {
        await questionService.addQuestion(user.id, params.tId, questionData.question_text);
        response.redirect(`/topics/${params.tId}`);
    }
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    return response.redirect(`/topics/${params.tId}`);
};

//////////////////////////////////////////////
/////////////// O P T I O N S ////////////////
//////////////////////////////////////////////

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        option_text: params.get("option_text"),
        correctness: params.has("correctness"),
    };
};

const listQuestionOptions = async ({ params, render }) => {
    render("topicQAs.eta", {
        topicId: params.tId,
        questionId: params.qId,
        questionText: await questionService.questionText(params.tId, params.qId),
        allOptions: await questionService.listOptions(params.qId),
    });
};

const addOption = async ({ params, response, render, request }) => {
    const optionData = await getOptionData(request);
    
    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        optionData.errors = errors;
        render("topicQAs.eta", optionData);
    } else {
        console.log(optionData.correctness)
        await questionService.addOption(params.qId, optionData.option_text, optionData.correctness);
        response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
    }
};

const deleteOption = async ({ params, response }) => {
    await questionService.deleteOption(params.qId, params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { 
    addQuestion, 
    deleteQuestion, 
    listQuestions,
    addOption,
    listQuestionOptions,
    deleteOption
};