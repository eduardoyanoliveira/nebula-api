import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { UpdateQuestionRepository } from "../../../database/Question/update-question";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { FinishQuestionController } from "./finish-question-controller";
import { FinishQuestionService } from "./finish-question-service";

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);
const updateQuestionRepository = new UpdateQuestionRepository(dataToQuestion);

const finishQuestionService = new FinishQuestionService(findQuestionByIdRepository, updateQuestionRepository);

const finishQuestionController = new FinishQuestionController(finishQuestionService, questionToResponse);

export { finishQuestionController, finishQuestionService };