import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { deleteTodo } from '../../helper/firebase';
import { RequestParamsId } from '../../types/requestParamsId';

/**
 * This route allows you to delete a Todo by it id.
 * @route DELETE /firebase/todo
 * @param {DeleteTodo.model} id.body.required - The id of the Todo
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {string} 200 - Ok
 * @returns {Error}  404 - Could not find object.
 * @security JWT
 */
export default async (
  req: Request<RequestParamsId, unknown, Todo>,
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
