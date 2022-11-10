import { Router } from "express";
import { countLikesByAnswerController } from "../application/useCases/Like/CountLikesByAnswer";
import { createLikeController } from "../application/useCases/Like/CreateLike";
import { findLikeByAuthorAndAnswerController } from "../application/useCases/Like/FindLikeByAuthorAndAnswer";
import { removeLikeController } from "../application/useCases/Like/RemoveLike";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const likeRouter = Router();

likeRouter.get(
    '/find_like_by_author_and_answer', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => findLikeByAuthorAndAnswerController.handle(req, res)
);

likeRouter.get(
    '/count_likes_by_answer/:answerId', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => countLikesByAnswerController.handle(req, res)
);

likeRouter.post(
    '', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createLikeController.handle(req, res)
);

likeRouter.delete(
    '', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => removeLikeController.handle(req, res)
);

export { likeRouter };