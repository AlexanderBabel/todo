import React from "react";
import { Todo } from "../types/todo";
import { CheckOutlined } from "@ant-design/icons";
import { TODOS_QUERY, TodoQuery } from "../gql/queries";
import { DataProxy, useMutation } from "@apollo/client";
import {
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
  UPDATE_TODO_MUTATION,
} from "../gql/mutations";

type TodoCompletedSwitchProps = {
  todo: Todo;
};

export default function TodoCompletedSwitch({
  todo,
}: TodoCompletedSwitchProps) {
  const [updateTodoCompleted] = useMutation<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >(UPDATE_TODO_MUTATION, {
    onError: () => {},
  });

  function onToggleCompleted() {
    function update(cache: DataProxy) {
      const todos = cache.readQuery<TodoQuery>({ query: TODOS_QUERY });
      const todoCacheIndex =
        todos?.todos.findIndex((e) => e.id === todo.id) || 0;

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: [
            ...(todos?.todos.slice(0, todoCacheIndex) || []),
            { ...todo, completed: !todo.completed },
            ...(todos?.todos.slice(todoCacheIndex + 1) || []),
          ],
        },
      });
    }

    updateTodoCompleted({
      variables: { data: { id: todo.id, completed: !todo.completed } },
      update,
    });
  }

  return (
    <button
      className={`flex h-6 w-6 rounded-full border border-gray-400 mr-6 items-center justify-center ${
        todo.completed ? "bg-green-400 text-white" : "bg-white"
      }`}
      onClick={onToggleCompleted}
    >
      {todo.completed ? <CheckOutlined className="text-sm" /> : null}
    </button>
  );
}
