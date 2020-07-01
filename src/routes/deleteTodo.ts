import { Request, Response } from 'express';
import { deleteTodo } from '../helper/storage';
import { RequestParamsId } from '../types/requestParamsId';

/**
 * @typedef DeleteTodo
 * @property {number} id.required - The id of the Todo. - eg: 1
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
export default async (
  req: Request<RequestParamsId, unknown, never>,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  const dbRes = await deleteTodo(id);
  if (dbRes) {
    res.send('Ok');
    return;
  }

  res.status(404).send('Could not find object.');
};
