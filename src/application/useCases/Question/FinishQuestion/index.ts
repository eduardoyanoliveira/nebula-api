import { QuestionRepository } from "../../../database/Question/question-repository";
import { QuestionDTO } from "../../../DTOs/Question/question-dto";
import { FinishQuestionController } from "./finish-question-controller";
import { FinishQuestionService } from "./finish-question-service";

const questionDTO = new QuestionDTO();

const questionRepository = new QuestionRepository(questionDTO);

const finishQuestionService = new FinishQuestionService(questionRepository);

const finishQuestionController = new FinishQuestionController(finishQuestionService, questionDTO);

export { finishQuestionController, finishQuestionService };