import { UpdateQuestionService } from "./update-question-service";
import { UpdateQuestionController } from './update-question-controller';
import { QuestionRepository } from '../../../database/Question/question-repository';
import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { QuestionDTO } from "../../../DTOs/Question/question-dto";
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";

const questionDTO = new QuestionDTO();
const subjectDTO = new SubjectDTO();

const questionRepository = new QuestionRepository(questionDTO)
const subjectRepository = new SubjectRepository(subjectDTO)

const updateQuestionService = new UpdateQuestionService(questionRepository, subjectRepository);

const updateQuestionController = new UpdateQuestionController(updateQuestionService, questionDTO);

export { updateQuestionController, updateQuestionService };