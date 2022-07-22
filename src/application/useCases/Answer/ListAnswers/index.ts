import { AnswerRepository } from "../../../database/Answer/answer-repository";
import { answerDTO } from "../../../DTOs/Answers/answer-dto";
import { ListAnswersController } from "./list-answers-contorller";
import { ListAnswersService } from "./list-answers-service";


const answerRepository = new AnswerRepository(answerDTO);

const listAnswersService = new ListAnswersService(answerRepository);

const listAnswersController = new ListAnswersController(listAnswersService, answerDTO);

export { listAnswersController, listAnswersService };