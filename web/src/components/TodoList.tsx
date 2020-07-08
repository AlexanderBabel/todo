import React, { useMemo } from "react";

import { useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";

import { TodoQuery, TODOS_QUERY } from "../gql/queries";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data, loading, error } = useQuery<TodoQuery>(TODOS_QUERY);

  const doneTodos = useMemo(
    () => data?.todos.filter((e) => e.completed) || [],
    [data?.todos]
  );

  const openTodos = useMemo(
    () => data?.todos.filter((e) => !e.completed) || [],
    [data?.todos]
  );

  if (loading) {
    return (
      <p className="m-4 w-full text-center text-blue-800">
        <LoadingOutlined className="text-5xl" />
        <p className="p-2">Daten werden geladen</p>
      </p>
    );
  }

  if (error || !data) {
    return (
      <div className="border border-red-600 bg-red-200 text-red-600 rounded-md px-4 py-2 m-4">
        Es ist ein Fehler aufgetreten
      </div>
    );
  }

  return (
    <>
      <p className="font-medium text-xl my-4 ml-2">Offene Aufgaben</p>
      {openTodos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
      {openTodos.length === 0 && (
        <img src="/all_done.svg" alt="all done" className="p-4" />
      )}
      {doneTodos.length > 0 && (
        <p className="font-medium text-xl my-4 ml-2">Erledigte Aufgaben</p>
      )}
      {doneTodos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </>
  );
}
