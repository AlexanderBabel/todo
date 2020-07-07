import { Todo } from '../../graphql/typeDefs/Todo';
import { Request, Response } from 'express';
import { getTodo } from '../../helper/firebase';
import { RequestParamsId } from '../../types/requestParamsId';

/**
 * This route allows you to retrieve all saved Todos.
 * @route GET /firebase/todo/:id
 * @group firebase - Save Todos in Firestore database from Google's Firebase
 * @returns {Todo.model} 200 - An Todo.
 * @returns {Error}  404 - Todo not found.
 * @security JWT
 */
export default async (
  req: Request<RequestParamsId, unknown, Todo>,
  res: Response
): Promise<void> => {
  const dbRes = await getTodo(req.params.id, req.context.user);
  if (dbRes) {
    res.send(dbRes);
    return;
  }

  res.status(404).send('Todo not found');
};
