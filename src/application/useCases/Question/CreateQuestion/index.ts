import { QuestionFactory } from "../../../../domain/factories/Question/factory-class";
import { CreateQuestionService } from "./create-question-service";
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { QuestionRepository } from "../../../database/Question/question-repository";
import { CreateQuestionController } from "./create-question-controller";
import { QuestionDTO } from '../../../DTOs/Question/question-dto';
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";

const questionDTO = new QuestionDTO();
const dataToSubject = new DataToSubject();
const dataToUser = new DataToUser();

const questionFactory = new QuestionFactory();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);
const questionRepository = new QuestionRepository(questionDTO);

const createQuestionService = new CreateQuestionService(
    questionFactory, 
    findUserByIdRepository, 
    findSubjectByIdRepository,
    questionRepository
);

const createQuestionController = new CreateQuestionController(createQuestionService, questionDTO);

export { createQuestionController, createQuestionService };