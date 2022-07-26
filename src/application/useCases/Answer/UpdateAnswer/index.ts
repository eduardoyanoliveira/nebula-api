import { FindAnswerByIdRepository } from "../../../database/Answer/find-answer-by-id";
import { UpdateAnswerRepository } from "../../../database/Answer/update-answer";
import { AnswerToResponse } from "../../../DTOs/Answers/answer-to-response";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { UpdateAnswerController } from "./update-answer-controller";
import { UpdateAnswerService } from "./update-answer-service";

const dataToUser = new DataToUser();
const dataToQuestion = new DataToQuestion();
const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);

const questionToResponse = new QuestionToResponse();
const answerToResponse = new AnswerToResponse(questionToResponse);


const findAnswerByIdRepository = new FindAnswerByIdRepository(dataToAnswer);
const updateAnswerRepository = new UpdateAnswerRepository(dataToAnswer);

const updateAnswerService = new UpdateAnswerService(findAnswerByIdRepository, updateAnswerRepository);

const updateAnswerController = new UpdateAnswerController(updateAnswerService, answerToResponse);

export { updateAnswerController, updateAnswerService };