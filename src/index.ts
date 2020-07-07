import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
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
        'Service Engineering Express Backend. This is a simple API which can manage Todos.',
      title: 'SEEB',
      version: '1.0.0',
    },
    host: 'seeb.alexbabel.com',
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
};
expressSwagger(options);

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`Started server on port ${process.env.PORT ?? 4000}`);
});
