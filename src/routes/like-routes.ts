import { Router } from "express";
import { findLikeByAuthorAndAnswerController } from "../application/useCases/Like/FindLikeByAuthorAndAnswer";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const likeRouter = Router();

likeRouter.get(
    '', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    findLikeByAuthorAndAnswerController.handle
);

export { likeRouter };