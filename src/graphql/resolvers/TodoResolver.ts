import { Todo } from '../typeDefs/Todo';
import { TodoInput } from '../typeDefs/TodoInput';
import { Resolver, Query, Ctx, Mutation, Arg, ID, Authorized } from 'type-graphql';
import { Context } from '../../middlewares/authentication';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../helper/firebase';

@Resolver((of) => Todo)
export class TodoResolver {
  @Authorized()
  @Query((returns) => [Todo], { description: 'Resturns all available Todos' })
  todos(@Ctx() ctx: Context): Promise<Todo[]> {
    return getTodos(ctx.user);
  }

  @Authorized()
  @Mutation((returns) => Todo, { description: 'Create a new Todo' })
  createTodo(
    @Arg('name', { description: 'The name of the new Todo' }) name: string,
    @Arg('dueDate', { description: 'Optional. A date when the Todo is due', nullable: true })
    dueDate: Date,
    @Ctx() ctx: Context
  ): Promise<Todo> {
    return addTodo(ctx.user, name, dueDate);
  }

  @Authorized()
  @Mutation((returns) => Boolean, { description: 'Update an exisiting Todo' })
  updateTodo(
    @Arg('data', { description: 'The data of the updated Todo' }) data: TodoInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return updateTodo(data.id, ctx.user, data.name, data.dueDate, data.completed);
  }

  @Authorized()
  @Mutation((returns) => Boolean, { description: 'Delete an exisiting Todo' })
  deleteTodo(
    @Arg('id', (returns) => ID, { description: 'The ID of the Todo you want to delete.' })
    id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return deleteTodo(id, ctx.user);
  }
}
