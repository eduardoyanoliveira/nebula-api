import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { handleRequestError } from './middlewares/handeRequestError';
import { requestLog } from './middlewares/requestLog';

import { userRoutes } from './routes/user-routes';
import { sessionRoutes } from './routes/session-routes';
import { subjectRoutes } from './routes/subject-routes';
import { rankRoutes } from './routes/rank-routes';
import { rankmarkRoutes } from './routes/rankmark-routes';
import { contentRoutes } from './routes/content-routes';
import { questionRoutes } from './routes/question-routes';
import { answerRoutes } from './routes/answer-routes';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Configure Server to accept json data
app.use(express.json());

// Middleware that logs every server request on console 
app.use(requestLog);

// Sets server to use the specifics routes 
app.use(userRoutes);
app.use(sessionRoutes);
app.use(subjectRoutes);
app.use(rankRoutes);
app.use(rankmarkRoutes);
app.use(contentRoutes);
app.use(questionRoutes);
app.use(answerRoutes);

// Middleware that handles request erros
app.use(handleRequestError);

export { app };