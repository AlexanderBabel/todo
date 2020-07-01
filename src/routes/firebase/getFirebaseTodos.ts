import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { getTodos } from '../../helper/firebase';

/**
 * This route allows you to retrieve all saved Todos.
 * @route GET /firebase/todo
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {Array.<Todo>} 200 - An array of Todos.
 * @returns {Error}  500 - Something went wrong.
 * @security JWT
 */
export default async (req: Request<never, unknown, Todo>, res: Response): Promise<void> => {
  const dbRes = await getTodos();
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong.');
};
