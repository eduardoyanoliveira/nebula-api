import { Router } from 'express';
import { createSubjectController } from '../application/useCases/Subject/CreateSubject';
import { getSubjectController } from '../application/useCases/Subject/GetSubject';
import { listSubjectsController } from '../application/useCases/Subject/ListSubjects';
import { updateSubjectController } from '../application/useCases/Subject/UpdateSubject';
import { jwtAuthenticate } from '../middlewares/Authenticate';

// SUBJECT ROUTES 

const subjectRoutes = Router();

subjectRoutes.post(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createSubjectController.handle(req, res)
);

subjectRoutes.get(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getSubjectController.handle(req, res)
);

subjectRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listSubjectsController.handle(req, res)
);

subjectRoutes.patch(
    '/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateSubjectController.handle(req, res)
);

export { subjectRoutes };