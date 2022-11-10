import { Router } from 'express';
import { createContentController } from '../application/useCases/Content/CreateContent';
import { listContentsController } from '../application/useCases/Content/ListContents';
import { updateContentController } from '../application/useCases/Content/UpdateContent';
import { jwtAuthenticate } from '../middlewares/Authenticate';

const contentRoutes = Router();

// CONTENT ROUTES

contentRoutes.post(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createContentController.handle(req, res)
);

contentRoutes.patch(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateContentController.handle(req, res)
);

contentRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listContentsController.handle(req, res)
);

export { contentRoutes };
