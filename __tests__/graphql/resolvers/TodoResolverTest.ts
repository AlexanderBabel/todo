import { GraphQLSchema, graphql } from 'graphql';
import { getSchema } from '../../../src/graphql';
import { gql } from 'apollo-server-express';
import { Context } from '../../../src/middlewares/authentication';
import * as firebase from '../../../src/helper/firebase';
import { mocked } from 'ts-jest/utils';
import { TodosData, TodoData, TodoData2 } from '../../../__tests__helper__/sampleData';
import {
  todosQuery,
  todoQuery,
  createTodoQuery,
  createTodo2Query,
} from '../../../__tests__helper__/queries';

jest.mock('../../../src/helper/firebase');

const firebaseMock = mocked(firebase);
firebaseMock.addTodo.mockResolvedValue(TodoData);
firebaseMock.getTodo.mockResolvedValue(TodoData);

let schema: GraphQLSchema;
const ctx: Context = { user: 'JEST_TEST' };

beforeAll(async (done) => {
  schema = await getSchema();
  done();
});

describe('Test of TodoResolver', () => {
  test('Test of "todo" query', async (done) => {
    firebaseMock.getTodo.mockResolvedValue(TodoData);

    const res = await graphql(schema, todoQuery, null, ctx);
    expect(res).toMatchSnapshot();

    expect(firebaseMock.getTodo).toHaveBeenCalledTimes(1);
    expect(firebaseMock.getTodo.mock.calls[0]).toMatchSnapshot();

    firebaseMock.getTodo.mockReset();
    done();
  });

  test('Test of "todo" query with no result', async (done) => {
    firebaseMock.getTodo.mockResolvedValue(undefined);

    const res = await graphql(schema, todoQuery, null, ctx);
    expect(res).toMatchSnapshot();

    expect(firebaseMock.getTodo).toHaveBeenCalledTimes(1);
    expect(firebaseMock.getTodo.mock.calls[0]).toMatchSnapshot();

    firebaseMock.getTodo.mockReset();
    done();
  });

  test('Test of "todos" query', async (done) => {
    firebaseMock.getTodos.mockResolvedValue(TodosData);

    const res = await graphql(schema, todosQuery, null, ctx);
    expect(res).toMatchSnapshot();

    expect(firebaseMock.getTodos).toHaveBeenCalledTimes(1);
    expect(firebaseMock.getTodos.mock.calls[0]).toMatchSnapshot();

    firebaseMock.getTodos.mockReset();
    done();
  });

  test('Test of "createTodo" mutation without dueDate', async (done) => {
    firebaseMock.addTodo.mockResolvedValue(TodoData2);

    const res = await graphql(schema, createTodoQuery, null, ctx);
    expect(res).toMatchSnapshot();

    expect(firebaseMock.addTodo).toHaveBeenCalledTimes(1);
    expect(firebaseMock.addTodo.mock.calls[0]).toMatchSnapshot();

    firebaseMock.addTodo.mockReset();
    done();
  });

  test('Test of "createTodo" mutation with dueDate', async (done) => {
    firebaseMock.addTodo.mockResolvedValue(TodoData2);

    const res = await graphql(schema, createTodo2Query, null, ctx);
    expect(res).toMatchSnapshot();

    expect(firebaseMock.addTodo).toHaveBeenCalledTimes(1);
    expect(firebaseMock.addTodo.mock.calls[0]).toMatchSnapshot();

    firebaseMock.addTodo.mockReset();
    done();
  });
});
