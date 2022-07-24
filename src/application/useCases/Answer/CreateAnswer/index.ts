import { AnswerRepository } from "../../../database/Answer/answer-repository";
import { QuestionRepository } from '../../../database/Question/question-repository';
import { QuestionDTO } from '../../../DTOs/Question/question-dto';
import { CreateAnswerService } from "./create-answer-service";
import { AnswerFactory } from "../../../../domain/factories/Answer/factory-class";
import { CreateAnswerController } from "./create-answer-controller";
import { answerDTO } from "../../../DTOs/Answers/answer-dto";
import { FindUserByIdRepository } from "../../../database/User/find-user-by-id";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const dataToUser = new DataToUser();
const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const questionDTO = new QuestionDTO();
const questionRepository = new QuestionRepository(questionDTO);

const answerRepository = new AnswerRepository(answerDTO);

const answerFactory = new AnswerFactory();

const createAnswerService = new CreateAnswerService(findUserByIdRepository, questionRepository, answerRepository, answerFactory);

const createAnswerController = new CreateAnswerController(createAnswerService, answerDTO);

export { createAnswerController, createAnswerService };