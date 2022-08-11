import http from 'http';
import { app } from './app';

const server = http.createServer(app);

server.listen(3333, () => console.log('SERVER STARTED AT PORT 3333!'));