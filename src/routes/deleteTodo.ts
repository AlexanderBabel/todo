import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { deleteTodo } from '../helper/storage';

// TODO: implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: Request<any, unknown, Todo>, res: Response): Promise<void> => {
  const todo = req.body;
  if (todo.id === undefined) {
    res.status(400).send('ID is missing.');
    return;
  }

  const dbRes = await deleteTodo(todo.id);
  if (dbRes) {
    res.send('Ok');
    return;
  }

  res.status(500).send('Could not find object.');
};
