import { Router } from "express";
import { createUserController } from "../application/useCases/User/CreateUser";
import { getUserController } from "../application/useCases/User/GetUser";
import { listUsersController } from "../application/useCases/User/ListUsers";
import { updateUserController } from "../application/useCases/User/UpdateUser";
import { jwtAuthenticate } from "../middlewares/Authenticate";

const userRoutes = Router();

// USER ROUTES

userRoutes.post('/users', (req, res) => createUserController.handle(req, res));

userRoutes.get(
    '/users/:id', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getUserController.handle(req, res)
);

userRoutes.get(
    '/users',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listUsersController.handle(req, res)
);


userRoutes.patch(
    '/users/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateUserController.handle(req, res)
);


export { userRoutes };