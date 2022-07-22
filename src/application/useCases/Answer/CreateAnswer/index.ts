import { AnswerRepository } from "../../../database/Answer/answer-repository";
import { UserRepository } from "../../../database/User/user-repository";
import { UserDTO } from '../../../DTOs/User/user-dto';
import { QuestionRepository } from '../../../database/Question/question-repository';
import { QuestionDTO } from '../../../DTOs/Question/question-dto';
import { CreateAnswerService } from "./create-answer-service";
import { AnswerFactory } from "../../../../domain/factories/Answer/factory-class";
import { CreateAnswerController } from "./create-answer-controller";
import { answerDTO } from "../../../DTOs/Answers/answer-dto";

const userDTO = new UserDTO();
const userRepository = new UserRepository(userDTO);

const questionDTO = new QuestionDTO();
const questionRepository = new QuestionRepository(questionDTO);

const answerRepository = new AnswerRepository(answerDTO);

const answerFactory = new AnswerFactory();

const createAnswerService = new CreateAnswerService(userRepository, questionRepository, answerRepository, answerFactory);

const createAnswerController = new CreateAnswerController(createAnswerService, answerDTO);

export { createAnswerController, createAnswerService };