import { Router } from "express";
import { createUserController } from "../application/useCases/User/CreateUser";
import { findUserByIdController } from "../application/useCases/User/FindUserById";
import { listUsersController } from "../application/useCases/User/ListUsers";
import { updateUserController } from "../application/useCases/User/UpdateUser";
import { jwtAuthenticate } from "../middlewares/Authenticate";
import { upload } from '../middlewares/imageUpload';

const userRoutes = Router();

// USER ROUTES

userRoutes.post(
    '', 
    upload.single('file'), 
    (req, res) => createUserController.handle(req, res)
);

userRoutes.get(
    '/:id', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => findUserByIdController.handle(req, res)
);

userRoutes.get(
    '',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listUsersController.handle(req, res)
);


userRoutes.patch(
    '/:id',
    upload.single('file'),
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateUserController.handle(req, res)
);


export { userRoutes };