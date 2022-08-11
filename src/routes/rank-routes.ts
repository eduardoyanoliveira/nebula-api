import { Router } from 'express';
import { listRanksBySubjectController } from '../application/useCases/Rank/ListRanksBySubject';
import { updateUserPointsController } from '../application/useCases/Rank/UpdateUserPoints';
import { jwtAuthenticate } from '../middlewares/Authenticate';

// RANK ROUTES

const rankRoutes = Router();

rankRoutes.get(
    '/ranks', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listRanksBySubjectController.handle(req, res)
);

rankRoutes.put(
    '/ranks/update_points', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateUserPointsController.handle(req, res)
);

export { rankRoutes };
