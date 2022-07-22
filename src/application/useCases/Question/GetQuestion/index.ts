import { GetQuestionService } from "./get-question-service";
import { QuestionRepository } from '../../../database/Question/question-repository';
import { GetQuestionController } from "./get-question-controller";
import { QuestionDTO } from "../../../DTOs/Question/question-dto";

const questionDTO = new QuestionDTO();

const questionRepository = new QuestionRepository(questionDTO);

const getQuestionService = new GetQuestionService(questionRepository);

const getQuestionController = new GetQuestionController(getQuestionService, questionDTO);

export { getQuestionController, getQuestionService };