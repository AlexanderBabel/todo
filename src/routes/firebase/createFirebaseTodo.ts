import { Todo } from '../../types/todo';
import { Request, Response } from 'express';
import { addTodo } from '../../helper/firebase';
import dayjs from 'dayjs';

/**
 * @typedef FirebaseCreateTodo
 * @property {string} name.required - The name of the Todo. - eg: Do Exercises
 * @property {string} dueDate - Optional. Date when the Todo is due. - eg: 2020-01-01T00:00:00.000Z
 */

/**
 * This route allows you to create a new Todo.
 * @route POST /firebase/todo
 * @param {FirebaseCreateTodo.model} todo.body.required - The Todo that should be saved.
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {FirebaseTodo.model} 200 - The created Todo
 * @returns {Error}  400 - Name is missing.
 * @returns {Error}  400 - Name must be a string.
 * @returns {Error}  400 - Invalid dueDate.
 * @returns {Error}  500 - Something went wrong during the saving process.
 * @security JWT
 */
export default async (req: Request<never, unknown, Todo>, res: Response): Promise<void> => {
  const todo = req.body;
  if (!todo.name) {
    res.status(400).send('Name is missing.');
    return;
  }

  if (typeof todo.name !== 'string') {
    res.status(400).send('Name must be a string.');
    return;
  }

  if (todo.dueDate && (typeof todo.dueDate !== 'string' || !dayjs(todo.dueDate).isValid())) {
    res.status(400).send('Invalid dueDate.');
    return;
  }

  const dbRes = await addTodo(todo.name, todo.dueDate);
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(500).send('Something went wrong during the saving process.');
};
