import { GetQuestionService } from "./get-question-service";
import { GetQuestionController } from "./get-question-controller";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse(); 

const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);

const getQuestionService = new GetQuestionService(findQuestionByIdRepository);

const getQuestionController = new GetQuestionController(getQuestionService, questionToResponse);

export { getQuestionController, getQuestionService };