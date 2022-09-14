import { Router } from "express";
import { createBestAnswerController } from "../application/useCases/BestAnswer/CreateBestAnswer";
import { listBestAnswerByAuthorController } from "../application/useCases/BestAnswer/ListBestAnswersByAuthor";
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

export { bestAnswerRoutes };