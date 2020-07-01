import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { getTodos } from '../helper/storage';

/**
 * This route allows you to retrieve all saved Todos.
 * @route GET /todo
 * @group local - Save Todos in memory of the server. A reset will happen after each restart of the server!
 * @returns {Array.<Todo>} 200 - An array of Todos.
 * @returns {Error}  500 - Something went wrong.
 * @security JWT
 */
export default (req: Request<never, unknown, Todo>, res: Response): void => {
  const dbRes = getTodos();
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong.');
};
