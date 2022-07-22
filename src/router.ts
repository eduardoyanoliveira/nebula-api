import { Router } from "express";
import { createAnswerController } from "./application/useCases/Answer/CreateAnswer";
import { listAnswersController } from "./application/useCases/Answer/ListAnswers";
import { updateAnswerController } from "./application/useCases/Answer/UpdateAnswer";
import { createContentController } from "./application/useCases/Content/CreateContent";
import { listContentsController } from "./application/useCases/Content/ListContents";
import { updateContentController } from "./application/useCases/Content/UpdateContent";
import { changeQuestionAccessController } from "./application/useCases/Question/ChangeQuestionAccess";
import { createQuestionController } from "./application/useCases/Question/CreateQuestion";
import { finishQuestionController } from "./application/useCases/Question/FinishQuestion";
import { getQuestionController } from "./application/useCases/Question/GetQuestion";
import { listQuestionsController } from "./application/useCases/Question/ListQuestions";
import { updateQuestionController } from "./application/useCases/Question/UpdateQuestion";
import { listRanksBySubjectController } from "./application/useCases/Rank/ListRanksBySubject";
import { updateUserPointsController } from "./application/useCases/Rank/UpdateUserPoints";
import { createRankmarkController } from "./application/useCases/Rankmark/CreateRankmark";
import { listRankmarksController } from "./application/useCases/Rankmark/ListRankmarks";
import { updateRankmarkController } from "./application/useCases/Rankmark/UpdateRankmark";
import { createSubjectController } from "./application/useCases/Subject/CreateSubject";
import { getSubjectController } from "./application/useCases/Subject/GetSubject";
import { listSubjectsController } from "./application/useCases/Subject/ListSubjects";
import { updateSubjectController } from "./application/useCases/Subject/UpdateSubject";
import { createUserController } from "./application/useCases/User/CreateUser";
import { getUserController } from "./application/useCases/User/GetUser";
import { listUsersController } from "./application/useCases/User/ListUsers";
import { updateUserController } from "./application/useCases/User/UpdateUser";
import { userAuthenticationController } from "./application/useCases/User/UserAuthentication";
import { jwtAuthenticate } from "./middlewares/Authenticate";

const router = Router();

// USER ROUTES

router.post('/users', (req, res) => createUserController.handle(req, res));
router.post('/sessions', (req, res) => userAuthenticationController.handle(req, res));

router.get(
    '/users/:id', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getUserController.handle(req, res)
);

router.get(
    '/users',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listUsersController.handle(req, res)
);


router.patch(
    '/users/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateUserController.handle(req, res)
);



// SUBJECT ROUTES 

router.post(
    '/subjects',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createSubjectController.handle(req, res)
);

router.get(
    '/subjects/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getSubjectController.handle(req, res)
);

router.get(
    '/subjects',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listSubjectsController.handle(req, res)
);

router.patch(
    '/subjects/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateSubjectController.handle(req, res)
);


// RANK ROUTES

router.get(
    '/ranks', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listRanksBySubjectController.handle(req, res)
);

router.put(
    '/ranks/update_points', 
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateUserPointsController.handle(req, res)
);


// RANKMARK ROUTES

router.post(
    '/rankmarks',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createRankmarkController.handle(req, res)
);

router.get(
    '/rankmarks',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listRankmarksController.handle(req, res)
);

router.patch(
    '/rankmarks/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateRankmarkController.handle(req, res)
);


// CONTENT ROUTES

router.post(
    '/contents',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createContentController.handle(req, res)
);

router.patch(
    '/contents/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateContentController.handle(req, res)
);

router.get(
    '/contents',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listContentsController.handle(req, res)
);


// QUESTION ROUTES

router.post(
    '/questions',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createQuestionController.handle(req, res)
);

router.post(
    '/questions/:id/change_access',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => changeQuestionAccessController.handle(req, res)
);

router.post(
    '/question/:id/finish',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => finishQuestionController.handle(req, res)
);

router.patch(
    '/questions/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateQuestionController.handle(req, res)
);


router.get(
    '/questions/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => getQuestionController.handle(req, res)
);


router.get(
    '/questions',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listQuestionsController.handle(req, res)
);

// ANSWER ROUTES

router.post(
    '/answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => createAnswerController.handle(req, res)
);

router.get(
    '/answers',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => listAnswersController.handle(req, res)
);

router.patch(
    '/answers/:id',
    (req, res, next) => jwtAuthenticate.authenticate(req, res, next),
    (req, res) => updateAnswerController.handle(req, res)
);


export default router;