import { ListQuestionsRepository } from "../../../database/Question/list-questions";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { ListQuestionsController } from "./list-questions-controller";
import { ListQuestionsService } from "./list-questions-service";

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const listQuestionsRepository = new ListQuestionsRepository(dataToQuestion);

const listQuestionsService = new ListQuestionsService(listQuestionsRepository);


const listQuestionsController = new ListQuestionsController(listQuestionsService, questionToResponse);

export { listQuestionsController, listQuestionsService };