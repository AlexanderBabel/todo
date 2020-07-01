import { FirebaseTodo } from '../../types/todo';
import { Request, Response } from 'express';
import { deleteTodo } from '../../helper/firebase';

/**
 * @typedef FirebaseDeleteTodo
 * @property {string} id.required - The id of the Todo. - eg: ZCbyborpT9XQVuszHOBH
 */

/**
 * This route allows you to delete a Todo by it id.
 * @route DELETE /firebase/todo
 * @param {FirebaseDeleteTodo.model} id.body.required - The id of the Todo
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {string} 200 - Ok
 * @returns {Error}  400 - ID is missing.
 * @returns {Error}  500 - Could not find object.
 * @security JWT
 */
export default async (req: Request<never, unknown, FirebaseTodo>, res: Response): Promise<void> => {
  const todo = req.body;
  if (!todo.id) {
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
