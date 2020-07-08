import React from "react";

import { useMutation, DataProxy } from "@apollo/client";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";

import { Todo } from "../types/todo";
import {
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  DELETE_TODO_TEXT_MUTATION,
} from "../gql/mutations";
import { TODOS_QUERY, TodoQuery } from "../gql/queries";

type TodoDeleteButtonProps = {
  todo: Todo;
};

export default function TodoDeleteButton({ todo }: TodoDeleteButtonProps) {
  const [deleteTodo, { loading: loadingDelete }] = useMutation<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >(DELETE_TODO_TEXT_MUTATION, {
    onError: () => {},
  });

  function onDeleteTodo() {
    function update(cache: DataProxy) {
      const todos = cache.readQuery<TodoQuery>({ query: TODOS_QUERY });
      cache.writeQuery({
        query: TODOS_QUERY,
        data: { todos: todos?.todos.filter((e) => e.id !== todo.id) },
      });
    }

    deleteTodo({ variables: { id: todo.id }, update });
  }

  if (loadingDelete) {
    return <LoadingOutlined className="ml-6" />;
  }

  return (
    <DeleteOutlined
      className="hover:text-red-600 ml-6"
      onClick={onDeleteTodo}
    />
  );
}
