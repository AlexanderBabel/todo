import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { getTodo } from '../helper/storage';
import { RequestParamsId } from '../types/requestParamsId';

/**
 * @typedef Todo
 * @property {string} id.required - The id of the Todo. - eg: 1
 * @property {string} name.required - The name of the Todo. - eg: Do Exercises
 * @property {boolean} completed.required - Whether if the Todo has been completed or not. - eg: true
 * @property {Date} dueDate - Optional. Date when the Todo is due. - eg: 2020-01-01T00:00:00.000Z
 */

/**
 * This route allows you to retrieve a specific saved Todo.
 * @route GET /todo/:id
 * @group local - Save Todos in memory of the server. A reset will happen after each restart of the server!
 * @returns {Todo.model} 200 - An Todo.
 * @returns {Error}  404 - Todo not found.
 * @security JWT
 */
export default (req: Request<RequestParamsId, unknown, Todo>, res: Response): void => {
  const dbRes = getTodo(req.params.id);
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(404).send('Todo not found');
};
