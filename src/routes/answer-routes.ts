import { Router } from "express";
import { createAnswerController } from "../application/useCases/Answer/CreateAnswer";
import { listAnswersController } from "../application/useCases/Answer/ListAnswers";
import { updateAnswerController } from "../application/useCases/Answer/UpdateAnswer";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const answerRoutes = Router();

// ANSWER ROUTES


answerRoutes.post(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createAnswerController.handle(req, res)
);

answerRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listAnswersController.handle(req, res)
);

answerRoutes.patch(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateAnswerController.handle(req, res)
);


export { answerRoutes };