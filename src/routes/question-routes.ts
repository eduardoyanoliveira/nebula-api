import { Router } from "express";
import { createQuestionController } from "../application/useCases/Question/CreateQuestion";
import { getQuestionController } from "../application/useCases/Question/GetQuestion";
import { listQuestionsController } from "../application/useCases/Question/ListQuestions";
import { updateQuestionController } from "../application/useCases/Question/UpdateQuestion";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const questionRoutes = Router();

// QUESTION ROUTES

questionRoutes.post(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createQuestionController.handle(req, res)
);


questionRoutes.patch(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateQuestionController.handle(req, res)
);


questionRoutes.get(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getQuestionController.handle(req, res)
);


questionRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listQuestionsController.handle(req, res)
);


export { questionRoutes };