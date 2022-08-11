import { CreateAnswerService } from "./create-answer-service";
import { AnswerFactory } from "../../../domain/factories/Answer/factory-class";
import { CreateAnswerController } from "./create-answer-controller";
import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { AnswerToResponse } from "../../../DTOs/Answers/answer-to-response";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { CreateAnswerRepository } from "../../../database/Answer/create-answer";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";


const dataToUser = new DataToUser();
const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();
const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);

const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);
const answerToResponse = new AnswerToResponse(questionToResponse);

const createAnswerRepository = new CreateAnswerRepository(dataToAnswer);

const answerFactory = new AnswerFactory();

const createAnswerService = new CreateAnswerService(
    findUserByIdRepository,
    findQuestionByIdRepository,
    createAnswerRepository,
    answerFactory
);

const createAnswerController = new CreateAnswerController(createAnswerService, answerToResponse);

export { createAnswerController, createAnswerService };