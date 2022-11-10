import { RemoveLikeService } from "./remove-like-service";
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { FindAnswerByIdRepository } from '../../../database/Answer/find-answer-by-id';
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { FindLikeByAuthorAndAnswerRepository } from "../../../database/Like/find-like-by-author-and-answer";
import { RemoveLikeRepository } from "../../../database/Like/remove-like-repository";
import { RemoveLikeController } from "./remove-like-controller";

const dataToUser = new DataToUser();
const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const dataToQuestion = new DataToQuestion();
const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);
const findAnswerByIdRepository = new FindAnswerByIdRepository(dataToAnswer);

const findLikeByAuthorAndAnswerRepository = new FindLikeByAuthorAndAnswerRepository();


const removeLikeRepository = new RemoveLikeRepository();

const removeLikeService = new RemoveLikeService(
    findUserByIdRepository,
    findAnswerByIdRepository,
    findLikeByAuthorAndAnswerRepository,
    removeLikeRepository
);

const removeLikeController = new RemoveLikeController(removeLikeService);

export { removeLikeService, removeLikeController };