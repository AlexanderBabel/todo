import { Todo } from '../types/todo';
import { Request, Response } from 'express';
import { deleteTodo } from '../helper/storage';

/**
 * @typedef DeleteTodo
 * @property {string} id.required - The id of the Todo. - eg: 1
 */

/**
 * This route allows you to delete a Todo by it id.
 * @route DELETE /todo
 * @param {DeleteTodo.model} id.body.required - The id of the Todo
 * @group local - Save Todos in memory of the server. A reset will happen after each restart of the server!
 * @returns {string} 200 - Ok
 * @returns {Error}  400 - ID is missing.
 * @returns {Error}  500 - Could not find object.
 * @security JWT
 */
export default async (req: Request<never, unknown, Todo>, res: Response): Promise<void> => {
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
