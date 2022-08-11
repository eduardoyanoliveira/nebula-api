import { Router } from "express";
import { createAnswerController } from "../application/useCases/Answer/CreateAnswer";
import { listAnswersController } from "../application/useCases/Answer/ListAnswers";
import { updateAnswerController } from "../application/useCases/Answer/UpdateAnswer";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const answerRoutes = Router();

// ANSWER ROUTES


answerRoutes.post(
    '/answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createAnswerController.handle(req, res)
);

answerRoutes.get(
    '/answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listAnswersController.handle(req, res)
);

answerRoutes.patch(
    '/answers/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateAnswerController.handle(req, res)
);


export { answerRoutes };