import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { updateTodo } from '../helper/storage';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (req: Request<any, unknown, Todo>, res: Response): void => {
  const todo = req.body;
  if (!todo.id) {
    res.status(400).send('ID is missing.');
    return;
  }

  if (todo.name && typeof todo.name !== 'string') {
    res.status(400).send('name must be a string.');
    return;
  }

  if (todo.dueDate && (typeof todo.dueDate !== 'string' || !dayjs(todo.dueDate).isValid())) {
    res.status(400).send('invalid dueDate.');
    return;
  }

  if (todo.completed && typeof todo.completed !== 'boolean') {
    res.status(400).send('completed must be a boolean.');
    return;
  }

  const dbRes = updateTodo(todo.id, todo.name, todo.dueDate, todo.completed);
  if (dbRes) {
    res.send('Ok');
    return;
  }

  res.status(500).send('Something went wrong during the saving process.');
};
