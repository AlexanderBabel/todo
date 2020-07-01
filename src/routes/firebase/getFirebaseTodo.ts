import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { getTodo } from '../../helper/firebase';
import { RequestParamsId } from '../../types/requestParamsId';

/**
 * @typedef FirebaseTodo
 * @property {string} id.required - The id of the Todo. - eg: ZCbyborpT9XQVuszHOBH
 * @property {string} name.required - The name of the Todo. - eg: Do Exercises
 * @property {boolean} completed.required - Whether if the Todo has been completed or not. - eg: true
 * @property {Date} dueDate - Optional. Date when the Todo is due. - eg: 2020-01-01T00:00:00.000Z
 */

/**
 * This route allows you to retrieve all saved Todos.
 * @route GET /firebase/todo/:id
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {Todo} 200 - An Todo.
 * @returns {Error}  404 - Todo not found.
 * @security JWT
 */
export default async (
  req: Request<RequestParamsId, unknown, Todo>,
  res: Response
): Promise<void> => {
  const dbRes = await getTodo(req.params.id);
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(404).send('Todo not found');
};
