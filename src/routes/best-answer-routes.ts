import { Router } from "express";
import { createBestAnswerController } from "../application/useCases/BestAnswer/CreateBestAnswer";
import { findBestAnswerByQuestionController } from "../application/useCases/BestAnswer/FindBestAnswerByQuestion";
import { listBestAnswerByAuthorController } from "../application/useCases/BestAnswer/ListBestAnswersByAuthor";
import { removeBestAnswerByQuestionController } from "../application/useCases/BestAnswer/RemoveBestAnswerByQuestion";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const bestAnswerRoutes = Router();

// Best ANSWER ROUTES


bestAnswerRoutes.post(
    '/best_answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createBestAnswerController.handle(req, res)
);

bestAnswerRoutes.get(
    '/best_answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listBestAnswerByAuthorController.handle(req, res)
);

bestAnswerRoutes.get(
    '/best_answers/find_by_question/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => findBestAnswerByQuestionController.handle(req, res)
);

bestAnswerRoutes.delete(
    '/best_answers/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => removeBestAnswerByQuestionController.handle(req, res)
);

export { bestAnswerRoutes };