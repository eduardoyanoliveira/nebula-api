import { UpdateQuestionService } from "./update-question-service";
import { UpdateQuestionController } from './update-question-controller';
import { QuestionRepository } from '../../../database/Question/question-repository';
import { FindSubjectByIdRepository } from '../../../database/Subject/find-subject-by-id';
import { QuestionDTO } from "../../../DTOs/Question/question-dto";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";

const questionDTO = new QuestionDTO();
const dataToSubject = new DataToSubject();

const questionRepository = new QuestionRepository(questionDTO)
const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject)

const updateQuestionService = new UpdateQuestionService(questionRepository, findSubjectByIdRepository);

const updateQuestionController = new UpdateQuestionController(updateQuestionService, questionDTO);

export { updateQuestionController, updateQuestionService };