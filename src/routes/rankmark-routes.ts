import { Router } from 'express';
import { createRankmarkController } from '../application/useCases/Rankmark/CreateRankmark';
import { listRankmarksController } from '../application/useCases/Rankmark/ListRankmarks';
import { updateRankmarkController } from '../application/useCases/Rankmark/UpdateRankmark';
import { jwtAuthenticate } from '../middlewares/Authenticate';

const rankmarkRoutes = Router();

// RANKMARK ROUTES

rankmarkRoutes.post(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createRankmarkController.handle(req, res)
);

rankmarkRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listRankmarksController.handle(req, res)
);

rankmarkRoutes.patch(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateRankmarkController.handle(req, res)
);

export { rankmarkRoutes };