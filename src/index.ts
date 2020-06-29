import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';

import authentication from './middlewares/authentication';
import createTodo from './routes/createTodo';
import deleteTodo from './routes/deleteTodo';
import getTodos from './routes/getTodos';
import updateTodo from './routes/updateTodo';
import createFirebaseTodo from './routes/firebase/createFirebaseTodo';
import deleteFirebaseTodo from './routes/firebase/deleteFirebaseTodo';

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(authentication);

// routes
app.get('/todo', getTodos);
app.post('/todo', createTodo);
app.patch('/todo', updateTodo);
app.delete('/todo', deleteTodo);

app.post('/firebase/todo', createFirebaseTodo);
app.delete('/firebase/todo', deleteFirebaseTodo);

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`Started server on port ${process.env.PORT ?? 4000}`);
});
