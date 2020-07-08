import { gql } from "@apollo/client";
import { Todo } from "../types/todo";

type TodoInput = {
  id: string;
  name?: string;
  completed?: boolean;
  dueDate?: string;
};

export const CREATE_TODO_MUTATION = gql`
  mutation createTodo($name: String!) {
    createTodo(name: $name) {
      id
      name
      completed
      dueDate
    }
  }
`;
export type CreateTodoMutation = Todo;
export type CreateTodoMutationVariables = {
  name: string;
  dueDate?: string;
};

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodoText($data: TodoInput!) {
    updateTodo(data: $data)
  }
`;
export type UpdateTodoMutation = boolean;
export type UpdateTodoMutationVariables = {
  data: TodoInput;
};

export const DELETE_TODO_TEXT_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
export type DeleteTodoMutation = boolean;
export type DeleteTodoMutationVariables = {
  id: string;
};

export const GENERATE_TOKEN_MUTATION = gql`
  mutation generateToken {
    generateToken
  }
`;
export type GenerateTokenMutation = string;
export type GenerateTokenMutationVariables = never;
