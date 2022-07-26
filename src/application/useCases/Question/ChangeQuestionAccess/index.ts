import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { UpdateQuestionRepository } from "../../../database/Question/update-question";
import { ChangeQuestionAccessController } from "./change-question-access-controller";
import { ChangeQuestionAccessSerivce } from "./change-question-access-service";
import { DataToQuestion } from '../../../DTOs/Question/data-to-question';
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);
const updateQuestionRepository = new UpdateQuestionRepository(dataToQuestion);

const changeQuestionAccessSerivce = new ChangeQuestionAccessSerivce(findQuestionByIdRepository, updateQuestionRepository);

const changeQuestionAccessController = new ChangeQuestionAccessController(changeQuestionAccessSerivce, questionToResponse);

export { changeQuestionAccessController, changeQuestionAccessSerivce };