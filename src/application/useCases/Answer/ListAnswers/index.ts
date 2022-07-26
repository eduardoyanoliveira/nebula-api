import { ListAnswersRepository } from "../../../database/Answer/list-answers";
import { AnswerToResponse } from "../../../DTOs/Answers/answer-to-response";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { ListAnswersController } from "./list-answers-contorller";
import { ListAnswersService } from "./list-answers-service";

const dataToUser = new DataToUser();
const dataToQuestion = new DataToQuestion();
const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);

const questionToResponse = new QuestionToResponse();
const answerToResponse = new AnswerToResponse(questionToResponse);

const listAnswersRepository = new ListAnswersRepository(dataToAnswer);

const listAnswersService = new ListAnswersService(listAnswersRepository);

const listAnswersController = new ListAnswersController(listAnswersService, answerToResponse);

export { listAnswersController, listAnswersService };