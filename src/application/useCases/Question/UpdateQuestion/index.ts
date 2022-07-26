import { UpdateQuestionService } from "./update-question-service";
import { UpdateQuestionController } from './update-question-controller';
import { FindSubjectByIdRepository } from '../../../database/Subject/find-subject-by-id';
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { UpdateQuestionRepository } from "../../../database/Question/update-question";

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const dataToSubject = new DataToSubject();

const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);
const updateQuestionRepository = new UpdateQuestionRepository(dataToQuestion);

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const updateQuestionService = new UpdateQuestionService(
    findQuestionByIdRepository,
    findSubjectByIdRepository,
    updateQuestionRepository
);

const updateQuestionController = new UpdateQuestionController(updateQuestionService, questionToResponse);

export { updateQuestionController, updateQuestionService };