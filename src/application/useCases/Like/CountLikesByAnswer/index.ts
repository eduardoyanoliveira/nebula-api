import { FindAnswerByIdRepository } from "../../../database/Answer/find-answer-by-id";
import { CountLikesByAnswerRepository } from "../../../database/Like/count-likes-by-answer-repospitory";
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { CountLikesByAnswerController } from "./count-likes-by-answer-controller";
import { CountLikesByAnswerService } from "./count-likes-by-answer-service";

const dataToUser = new DataToUser();
const dataToQuestion = new DataToQuestion();

const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);
const findAnswerByIdRepository = new FindAnswerByIdRepository(dataToAnswer);

const countLikesByAnswerRepository = new CountLikesByAnswerRepository();

const countLikeByAnswerService = new CountLikesByAnswerService(findAnswerByIdRepository, countLikesByAnswerRepository);
const countLikesByAnswerController = new CountLikesByAnswerController(countLikeByAnswerService);

export { countLikesByAnswerController, countLikeByAnswerService };