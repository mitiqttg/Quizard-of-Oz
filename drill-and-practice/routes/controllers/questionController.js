import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";
import * as topicsService from "../../services/topicsService.js";

// Minimum length requirements for question's text
const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

// Retrieve question data from input form
const getQuestionData = async (request, params) => {
    const body = request.body({ type: "form" });
    const paramsBody = await body.value;
    return {
        question_text: paramsBody.get("question_text"),
        tId: params.tId,
        topicName: await questionService.topicName(params.tId),
        allQuestions: await questionService.listQuestions(params.tId),
    };
};

// List all the available questions for the current topic
const listQuestions = async ({ render, params, request }) => {
    render("topicQuestions.eta", await getQuestionData(request, params));
};

// Add a new question to the current topic
const addQuestion = async ({ request, response, render, user, params }) => {
    const questionData = await getQuestionData(request, params, user);
    
    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules,);
    // If the length requirement is not met, return a message and stay on the current page 
    if (!passes) {
        questionData.errors = errors;
        questionData.message = "Question should not be empty";
        return render("topicQuestions.eta", questionData);
    }

    // If question is OK, add it to the database and reload current topic page
    await questionService.addQuestion(user.id, params.tId, questionData.question_text);
    return response.redirect(`/topics/${params.tId}`);
};

// Delete a question
const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    return response.redirect(`/topics/${params.tId}`);
};

   /////////////////////////////////////////////////////////
  /////// T H I S --- P A R T --- IS --- F O R ////////////
 /////// O P T I O N S --- C O N T R O L L E R S /////////
/////////////////////////////////////////////////////////

// Minimum length required for option
const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

// Retrieve option data from input form
const getOptionData = async (request, params, user) => {
    const body = request.body({ type: "form" });
    const paramsBody = await body.value;
    return {
        correctness: paramsBody.has("is_correct"),
        option_text: paramsBody.get("option_text"),
        topicId: params.tId,
        questionId: params.qId,
        topicName: await questionService.topicName(params.tId),
        allOptions: await questionService.listOptions(params.qId),
        questionText: await questionService.questionText(params.tId, params.qId),
        user: user,
        isAdmin : await topicsService.isAdmin(user.id),
    };
};

// List all the options for the current question
const listQuestionOptions = async ({ params, render, request, user }) => {
    return render("topicQAs.eta", await getOptionData(request, params, user));
};

// Add an option 
const addOption = async ({ params, response, render, request, user }) => {
    const optionData = await getOptionData(request, params, user);
    // Check if the option met the length requirement
    const [passes, errors] = await validasaur.validate( optionData, optionValidationRules );

    // If no, return a message below the current question page.
    // Add the option to the database and reload the question page if all satisfied.
    if (!passes) {
        optionData.errors = errors;
        optionData.optionMessage = "Option should not be empty";
        return render("topicQAs.eta", optionData);
    }

    await questionService.addOption(params.qId, optionData.option_text, optionData.correctness);
    return response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

// Delete an option from the database
const deleteOption = async ({ params, response }) => {
    await questionService.deleteOption(params.qId, params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { 
    addQuestion, 
    listQuestions,
    deleteQuestion, 
    addOption,
    listQuestionOptions,
    deleteOption
};
