import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { updateTodo } from '../../helper/firebase';
import dayjs from 'dayjs';
import { RequestParamsId } from '../../types/requestParamsId';

/**
 * @typedef FirebaseUpdateTodo
 * @property {string} id.required - The id of the Todo. - eg: ZCbyborpT9XQVuszHOBH
 * @property {string} name - The name of the Todo. - eg: Do Exercises
 * @property {boolean} completed - Whether if the Todo has been completed or not. - eg: true
 * @property {Date} dueDate - Optional. Date when the Todo is due. - eg: 2020-01-01T00:00:00.000Z
 */

/**
 * This route allows you to update a existing Todo.
 * @route PATCH /firebase/todo/:id
 * @param {FirebaseUpdateTodo.model} todo.body.required - The Todo that should be updated
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {string} 200 - Ok
 * @returns {Error}  400 - ID is missing.
 * @returns {Error}  400 - Name must be a string.
 * @returns {Error}  400 - Invalid dueDate.
 * @returns {Error}  400 - Completed must be a boolean.
 * @returns {Error}  500 - Something went wrong during the saving process.
 * @security JWT
 */
export default async (
  req: Request<RequestParamsId, unknown, Todo>,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const todo = req.body;

  if (todo.name && typeof todo.name !== 'string') {
    res.status(400).send('Name must be a string.');
    return;
  }

  if (todo.dueDate && (typeof todo.dueDate !== 'string' || !dayjs(todo.dueDate).isValid())) {
    res.status(400).send('Invalid dueDate.');
    return;
  }

  if (todo.completed && typeof todo.completed !== 'boolean') {
    res.status(400).send('Completed must be a boolean.');
    return;
  }

  const dbRes = await updateTodo(id, todo.name, todo.dueDate, todo.completed);
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong during the saving process.');
};
