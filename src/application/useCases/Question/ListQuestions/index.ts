import { QuestionRepository } from "../../../database/Question/question-repository";
import { QuestionDTO } from "../../../DTOs/Question/question-dto";
import { ListQuestionsController } from "./list-questions-controller";
import { ListQuestionsService } from "./list-questions-service";

const questionDTO = new QuestionDTO();

const questionRepository = new QuestionRepository(questionDTO);

const listQuestionsService = new ListQuestionsService(questionRepository);


const listQuestionsController = new ListQuestionsController(listQuestionsService, questionDTO);

export { listQuestionsController, listQuestionsService };