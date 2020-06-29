import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { addTodo } from '../helper/storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (req: Request<any, unknown, Todo>, res: Response): void => {
  const todo = req.body;
  if (!todo.name) {
    res.status(400).send('Name is missing.');
    return;
  }

  const dbRes = addTodo(todo.name, todo.dueDate ?? undefined);
  if (dbRes) {
    res.send('Ok');
    return;
  }

  res.status(500).send('Something went wrong during the saving process.');
};
