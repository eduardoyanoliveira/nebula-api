import { FindLikeByAuthorAndAnswerController } from "./find-like-by-author-and-answer-controller";
import { FindLikeByAuthorAndAnswerService } from "./find-like-by-author-and-answer-service";
import { FindLikeByAuthorAndAnswerRepository } from "../../../database/Like/find-like-by-author-and-answer";
import { findUserByIdRepository } from "../../User/FindUserById";
import { findAnswerByIdRepository } from "../../Answer/FindAnswerById";

const findLikeByAuthorAndAnswerRepository = new FindLikeByAuthorAndAnswerRepository();

const findLikeByAuthorAndAnswerService = new FindLikeByAuthorAndAnswerService(
    findUserByIdRepository,
    findAnswerByIdRepository,
    findLikeByAuthorAndAnswerRepository
);

const findLikeByAuthorAndAnswerController = new FindLikeByAuthorAndAnswerController( 
    findLikeByAuthorAndAnswerService,
);

export { 
    findLikeByAuthorAndAnswerController, 
    findLikeByAuthorAndAnswerService,
    findLikeByAuthorAndAnswerRepository 
};