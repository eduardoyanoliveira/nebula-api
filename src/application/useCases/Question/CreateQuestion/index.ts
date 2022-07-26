import { QuestionFactory } from "../../../../domain/factories/Question/factory-class";
import { CreateQuestionService } from "./create-question-service";
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { CreateQuestionController } from "./create-question-controller";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { DataToSubject } from "../../../DTOs/Subject/data-to-subject";
import { FindSubjectByIdRepository } from "../../../database/Subject/find-subject-by-id";
import { DataToQuestion } from '../../../DTOs/Question/data-to-question';
import { QuestionToResponse } from "../../../DTOs/Question/question-to-response";
import { CreateQuestionRepository } from '../../../database/Question/create-question';

const dataToQuestion = new DataToQuestion();
const questionToResponse = new QuestionToResponse();

const dataToSubject = new DataToSubject();
const dataToUser = new DataToUser();

const questionFactory = new QuestionFactory();

const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const findSubjectByIdRepository = new FindSubjectByIdRepository(dataToSubject);

const createQuestionRepository = new CreateQuestionRepository(dataToQuestion);

const createQuestionService = new CreateQuestionService(
    questionFactory, 
    findUserByIdRepository, 
    findSubjectByIdRepository,
    createQuestionRepository
);

const createQuestionController = new CreateQuestionController(createQuestionService, questionToResponse);

export { createQuestionController, createQuestionService };