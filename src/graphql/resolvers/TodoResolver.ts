import { Todo } from '../typeDefs/Todo';
import { Resolver, Query } from 'type-graphql';

@Resolver((of) => Todo)
export class TodoResolver {
  @Query((returns) => [Todo], { description: 'Resturns all available Todos' })
  async todos(): Promise<Todo[]> {
    return [];
  }
}
