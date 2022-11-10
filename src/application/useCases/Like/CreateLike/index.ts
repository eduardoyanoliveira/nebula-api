import { CreateLikeController } from "./create-like-controller";
import { CreateLikeService } from "./create-like-service";
import { CreateLikeRepository } from "../../../database/Like/create-like-repository";
import { findUserByIdRepository } from "../../User/FindUserById";
import { findAnswerByIdRepository } from "../../Answer/FindAnswerById";
import { findLikeByAuthorAndAnswerRepository } from "../FindLikeByAuthorAndAnswer";
import { LikeToResponse } from "../../../DTOs/Like/like-to-response";


const createLikeRepository = new CreateLikeRepository();

const createLikeService = new CreateLikeService(
    findUserByIdRepository,
    findAnswerByIdRepository,
    findLikeByAuthorAndAnswerRepository,
    createLikeRepository
);

const likeToResponse = new LikeToResponse();

const createLikeController = new CreateLikeController(
    createLikeService,
    likeToResponse
);

export { createLikeController, createLikeService };