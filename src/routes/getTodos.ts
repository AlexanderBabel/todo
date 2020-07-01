import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { getTodos } from '../helper/storage';

/**
 * @typedef Todo
 * @property {number} id.required - The id of the Todo. - eg: 1
 * @property {string} name.required - The name of the Todo. - eg: Do Exercises
 * @property {boolean} completed.required - Whether if the Todo has been completed or not. - eg: true
 * @property {Date} dueDate - Optional. Date when the Todo is due. - eg: 2020-01-01T00:00:00.000Z
 */

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
