import { CreateBestAnswerController } from "./create-best-answer-controller";
import { CreateBestAnswerService } from "./create-best-answer-service";
import { FindQuestionByIdRepository } from '../../../database/Question/find-question-by-id';
import { FindAnswerByIdRepository } from '../../../database/Answer/find-answer-by-id';
import { CreateBestAnswerRepository } from "../../../database/BestAnswer/create-best-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToUser } from "../../../DTOs/User/data-to-user";

const dataToQuestion = new DataToQuestion();
const dataToUser = new DataToUser();
const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);

const createBestAnswerService = new CreateBestAnswerService(
    new FindQuestionByIdRepository(dataToQuestion),
    new FindAnswerByIdRepository(dataToAnswer),
    new CreateBestAnswerRepository()
);

const createBestAnswerController = new CreateBestAnswerController(createBestAnswerService);

export { createBestAnswerController }