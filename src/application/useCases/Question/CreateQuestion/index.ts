import { QuestionFactory } from "../../../../domain/factories/Question/factory-class";
import { CreateQuestionService } from "./create-question-service";
import { UserRepository } from '../../../database/User/user-repository';
import { SubjectRepository } from '../../../database/Subject/subject-repository';
import { QuestionRepository } from "../../../database/Question/question-repository";
import { CreateQuestionController } from "./create-question-controller";
import { QuestionDTO } from '../../../DTOs/Question/question-dto';
import { SubjectDTO } from "../../../DTOs/Subject/subject-dto";
import { UserDTO } from "../../../DTOs/User/user-dto";

const questionDTO = new QuestionDTO();
const subjectDTO = new SubjectDTO();
const userDTO = new UserDTO();

const questionFactory = new QuestionFactory();

const userRepository = new UserRepository(userDTO);
const subjectRepository = new SubjectRepository(subjectDTO);
const questionRepository = new QuestionRepository(questionDTO);

const createQuestionService = new CreateQuestionService(
    questionFactory, 
    userRepository, 
    subjectRepository,
    questionRepository
);

const createQuestionController = new CreateQuestionController(createQuestionService, questionDTO);

export { createQuestionController, createQuestionService };