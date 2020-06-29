import { FirebaseTodo } from '../../types/todo';
import { Request, Response } from 'express';
import { addTodo } from '../../helper/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (req: Request<any, unknown, FirebaseTodo>, res: Response): void => {
  const todo = req.body;
  if (!todo.name) {
    res.status(400).send('Name is missing.');
    return;
  }

  const dbRes = addTodo(todo.name, todo.dueDate);
  if (dbRes) {
    res.send('Ok');
    return;
  }

  res.status(500).send('Something went wrong during the saving process.');
};
