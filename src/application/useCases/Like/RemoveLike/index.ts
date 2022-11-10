import { RemoveLikeService } from "./remove-like-service";
import { RemoveLikeController } from "./remove-like-controller";
import { PrismaRemoveLikeRepository } from '../../../database/Like/remove-like-repository';
import { findUserByIdRepository } from "../../User/FindUserById";
import { findAnswerByIdRepository } from "../../Answer/FindAnswerById";
import { findLikeByAuthorAndAnswerRepository } from "../FindLikeByAuthorAndAnswer";


const removeLikeRepository = new PrismaRemoveLikeRepository();

const removeLikeService = new RemoveLikeService(
    findUserByIdRepository,
    findAnswerByIdRepository,
    findLikeByAuthorAndAnswerRepository,
    removeLikeRepository
);

const removeLikeController = new RemoveLikeController(removeLikeService);

export { removeLikeService, removeLikeController, removeLikeRepository };