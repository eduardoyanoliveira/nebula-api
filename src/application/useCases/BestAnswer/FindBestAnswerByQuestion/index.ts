import { FindBestAnswerByQuestionRepository } from "../../../database/BestAnswer/find-best-answer-ny-question";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { FindBestAnswerByQuestionController } from "./find-best-answer-by-question-controller";
import { FindBestAnswerByQuestionService } from "./find-best-answer-by-question-service";

const dataToQuestion = new DataToQuestion();
const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);

const findBestAnswerByQuestionRepository = new FindBestAnswerByQuestionRepository()

const findBestAnswerByQuestionService = new FindBestAnswerByQuestionService(
    findQuestionByIdRepository,
    findBestAnswerByQuestionRepository
);

const findBestAnswerByQuestionController = new FindBestAnswerByQuestionController(findBestAnswerByQuestionService);

export { findBestAnswerByQuestionController };