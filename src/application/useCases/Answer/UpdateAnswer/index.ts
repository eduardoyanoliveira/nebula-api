import { AnswerRepository } from "../../../database/Answer/answer-repository";
import { answerDTO } from "../../../DTOs/Answers/answer-dto";
import { UpdateAnswerController } from "./update-answer-controller";
import { UpdateAnswerService } from "./update-answer-service";

const answerRepository = new AnswerRepository(answerDTO);
const updateAnswerService = new UpdateAnswerService(answerRepository);

const updateAnswerController = new UpdateAnswerController(updateAnswerService, answerDTO);

export { updateAnswerController, updateAnswerService };