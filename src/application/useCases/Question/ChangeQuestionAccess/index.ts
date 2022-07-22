import { QuestionRepository } from "../../../database/Question/question-repository";
import { ChangeQuestionAccessController } from "./change-question-access-controller";
import { ChangeQuestionAccessSerivce } from "./change-question-access-service";
import { QuestionDTO } from '../../../DTOs/Question/question-dto';

const questionDTO = new QuestionDTO();
const questionRepository = new QuestionRepository(questionDTO);
const changeQuestionAccessSerivce = new ChangeQuestionAccessSerivce(questionRepository);

const changeQuestionAccessController = new ChangeQuestionAccessController(changeQuestionAccessSerivce, questionDTO);

export { changeQuestionAccessController, changeQuestionAccessSerivce };