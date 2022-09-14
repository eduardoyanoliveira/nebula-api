import { RemoveBestAnswerByQuestionService } from "./remove-best-answer-by-question-service";
import { FindQuestionByIdRepository } from "../../../database/Question/find-question-by-id";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { RemoveBestAnswerByQuestionRepository } from "../../../database/BestAnswer/remove-best-answer-by-question";
import { RemoveBestAnswerByQuestionController } from './remove-best-answer-by-question-controller';

const dataToQuestion = new DataToQuestion();
const findQuestionByIdRepository = new FindQuestionByIdRepository(dataToQuestion);

const removeBestAnswerByQuestionRepository = new RemoveBestAnswerByQuestionRepository();

const removeBestAnswerByQuestionService = new RemoveBestAnswerByQuestionService(
    findQuestionByIdRepository,
    removeBestAnswerByQuestionRepository
);

const removeBestAnswerByQuestionController = new RemoveBestAnswerByQuestionController(
    removeBestAnswerByQuestionService
);

export { removeBestAnswerByQuestionController };