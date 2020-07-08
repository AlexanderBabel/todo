import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import expressSwaggerGenerator from 'express-swagger-generator';
import 'dotenv/config';

import authentication from './middlewares/authentication';
import createTodo from './routes/createTodo';
import deleteTodo from './routes/deleteTodo';
import getTodos from './routes/getTodos';
import updateTodo from './routes/updateTodo';
import createFirebaseTodo from './routes/firebase/createFirebaseTodo';
import deleteFirebaseTodo from './routes/firebase/deleteFirebaseTodo';
import getFirebaseTodos from './routes/firebase/getFirebaseTodos';
import updateFirebaseTodo from './routes/firebase/updateFirebaseTodo';
import getTodo from './routes/getTodo';
import getFirebaseTodo from './routes/firebase/getFirebaseTodo';
import graphql from './graphql';
import getToken from './routes/getToken';

const app = express();
const expressSwagger = expressSwaggerGenerator(app);

// middlewares
app.use(cors());
app.use(helmet());

app.use(express.static(__dirname + '/../web/build'));
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/../web/build/index.html'));
});

app.use(bodyParser.json());
app.use(authentication);

graphql(app);

// routes
app.get('/token', getToken);

app.get('/todo', getTodos);
app.get('/todo/:id', getTodo);
app.post('/todo', createTodo);
app.patch('/todo/:id', updateTodo);
app.delete('/todo/:id', deleteTodo);

app.get('/firebase/todo', getFirebaseTodos);
app.get('/firebase/todo/:id', getFirebaseTodo);
app.post('/firebase/todo', createFirebaseTodo);
app.patch('/firebase/todo/:id', updateFirebaseTodo);
app.delete('/firebase/todo/:id', deleteFirebaseTodo);

const options = {
  swaggerDefinition: {
    info: {
      description:
        'This is a simple API which can manage Todos. Supports REST and GraphQL. You can find the GraphQL documentation under: https://todo.alexbabel.com/graphql',
      title: 'Simple Todo Manager',
      version: '1.0.0',
    },
    host: 'todo.alexbabel.com',
    basePath: '/',
    produces: ['application/json'],
    schemes: ['https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'A JWT Key which is used to authenticate every request against the API.',
      },
    },
  },
  basedir: __dirname,
  files: ['./routes/**/*.js'],
  route: {
    url: '/api-docs',
    docs: '/api-docs.json',
  },
};
expressSwagger(options);

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`Started server on port ${process.env.PORT ?? 4000}`);
});
