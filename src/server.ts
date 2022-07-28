import express from 'express';
import { handleRequestError } from './middlewares/handeRequestError';
import { requestLog } from './middlewares/requestLog';
import 'express-async-errors';
import router from './router';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Configure Server to accept json data
app.use(express.json());

// Middleware that logs every server request on console 
app.use(requestLog);

// Sets server to use the specifs routes 
app.use(router);

// Middleware that handles request erros
app.use(handleRequestError);

app.listen(3333, () => console.log('SERVER STARTED AT PORT 3333!'));