import { CreateLikeController } from "./create-like-controller";
import { CreateLikeService } from "./create-like-service";
import { FindUserByIdRepository } from '../../../database/User/find-user-by-id';
import { DataToUser } from "../../../DTOs/User/data-to-user";
import { FindAnswerByIdRepository } from '../../../database/Answer/find-answer-by-id';
import { DataToAnswer } from "../../../DTOs/Answers/data-to-answer";
import { DataToQuestion } from "../../../DTOs/Question/data-to-question";
import { FindLikeByAuthorAndAnswerRepository } from "../../../database/Like/find-like-by-author-and-answer";
import { CreateLikeRepository } from "../../../database/Like/create-like-repository";

const dataToUser = new DataToUser();
const findUserByIdRepository = new FindUserByIdRepository(dataToUser);

const dataToQuestion = new DataToQuestion();
const dataToAnswer = new DataToAnswer(dataToUser, dataToQuestion);
const findAnswerByIdRepository = new FindAnswerByIdRepository(dataToAnswer);

const findLikeByAuthorAndAnswerRepository = new FindLikeByAuthorAndAnswerRepository();

const createLikeRepository = new CreateLikeRepository();

const createLikeService = new CreateLikeService(
    findUserByIdRepository,
    findAnswerByIdRepository,
    findLikeByAuthorAndAnswerRepository,
    createLikeRepository
);

const createLikeController = new CreateLikeController(createLikeService);

export { createLikeController, createLikeService };