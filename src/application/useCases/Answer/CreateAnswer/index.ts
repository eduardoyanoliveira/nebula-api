import { AnswerRepository } from "../../../database/Answer/answer-repository";
import { CreateAnswerService } from "./create-answer-service";
import { AnswerFactory } from "../../../../domain/factories/Answer/factory-class";
import { CreateAnswerController } from "./create-answer-controller";
import { answerDTO } from "../../../DTOs/Answers/answer-dto";
import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";

const dataToUser = new DataToUser();
const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const dataToQuestion = new DataToQuestion();
const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);

const answerRepository = new AnswerRepository(answerDTO);

const answerFactory = new AnswerFactory();

const createAnswerService = new CreateAnswerService(
    findUserByIdRepository,
    findQuestionByIdRepository,
    answerRepository,
    answerFactory
);

const createAnswerController = new CreateAnswerController(createAnswerService, answerDTO);

export { createAnswerController, createAnswerService };