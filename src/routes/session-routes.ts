import { Router } from "express";

import { userAuthenticationController } from "../application/useCases/User/UserAuthentication";

const sessionRoutes = Router();

sessionRoutes.post('', (req, res) => userAuthenticationController.handle(req, res));

export { sessionRoutes };
