import { gql } from "@apollo/client";
import { Todo } from "../types/todo";

export const TODOS_QUERY = gql`
  query todos {
    todos {
      id
      name
      completed
      dueDate
    }
  }
`;
export type TodoQuery = {
  todos: Todo[];
};
