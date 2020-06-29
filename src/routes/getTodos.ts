import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { getTodos } from '../helper/storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (req: Request<any, unknown, Todo>, res: Response): void => {
  const dbRes = getTodos();
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong.');
};
