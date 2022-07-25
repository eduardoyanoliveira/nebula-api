import { QuestionFactory } from "../../../../domain/factories/Question/factory-class";
import { CreateQuestionService } from "./create-question-service";
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { QuestionRepository } from "../../../database/Question/question-repository";
import { CreateQuestionController } from "./create-question-controller";
import { QuestionDTO } from '../../../DTOs/Question/question-dto';
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const questionDTO = new QuestionDTO();
const subjectDTO = new SubjectDTO();
const dataToUser = new DataToUser();

const questionFactory = new QuestionFactory();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);
const subjectRepository = new SubjectRepository(subjectDTO);
const questionRepository = new QuestionRepository(questionDTO);

const createQuestionService = new CreateQuestionService(
    questionFactory, 
    findUserByIdRepository, 
    subjectRepository,
    questionRepository
);

const createQuestionController = new CreateQuestionController(createQuestionService, questionDTO);

export { createQuestionController, createQuestionService };