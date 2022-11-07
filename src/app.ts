import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import morgan from 'morgan';
import { handleRequestError } from './middlewares/handeRequestError';

import { userRoutes } from './routes/user-routes';
import { sessionRoutes } from './routes/session-routes';
import { subjectRoutes } from './routes/subject-routes';
import { rankmarkRoutes } from './routes/rankmark-routes';
import { contentRoutes } from './routes/content-routes';
import { questionRoutes } from './routes/question-routes';
import { answerRoutes } from './routes/answer-routes';
import { bestAnswerRoutes } from './routes/best-answer-routes';
import { likeRouter } from './routes/like-routes';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

// Configure Server to accept json data
app.use(express.json());

// Configure the server to display the images
app.use('/files', express.static(path.resolve(__dirname, 'assets', 'images')));

// Sets server to use the specifics routes 
app.use(userRoutes);
app.use(sessionRoutes);
app.use(subjectRoutes);
app.use(rankmarkRoutes);
app.use(contentRoutes);
app.use(questionRoutes);
app.use('answer', answerRoutes);
app.use(bestAnswerRoutes);
app.use('likes', likeRouter);

// Middleware that handles request erros
app.use(handleRequestError);

export { app };