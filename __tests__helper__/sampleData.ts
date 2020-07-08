import { Todo } from '../src/graphql/typeDefs/Todo';

export const TodoData: Todo = {
  id: 'we121ew',
  name: 'Test Todo',
  completed: false,
};

export const TodoData2: Todo = {
  id: 'hr848rh',
  name: 'Todo #2',
  completed: true,
  dueDate: new Date('2020-01-01T00:00:00.000Z'),
};

export const TodosData: Todo[] = [TodoData, TodoData2];
