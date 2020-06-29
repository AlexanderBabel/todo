import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { getTodos } from '../../helper/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: Request<any, unknown, Todo>, res: Response): Promise<void> => {
  const dbRes = await getTodos();
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong.');
};
