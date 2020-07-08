import React, { useState } from "react";
import { DataProxy, FetchResult, useMutation } from "@apollo/client";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";

import { TODOS_QUERY, TodoQuery } from "../gql/queries";
import {
  CreateTodoMutation,
  CREATE_TODO_MUTATION,
  CreateTodoMutationVariables,
} from "../gql/mutations";

export default function CreateTodo() {
  const [text, setText] = useState<string>("");
  const [createTodo, { loading }] = useMutation<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >(CREATE_TODO_MUTATION, { update: updateCache, onCompleted });

  function updateCache(cache: DataProxy, result: FetchResult) {
    const todos = cache.readQuery<TodoQuery>({ query: TODOS_QUERY });
    cache.writeQuery({
      query: TODOS_QUERY,
      data: { todos: [result.data?.createTodo, ...(todos?.todos || [])] },
    });
  }

  function onCreateTodo() {
    if (text) {
      createTodo({ variables: { name: text } });
    }
  }

  function onSubmitCheck(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onCreateTodo();
    }
  }

  function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onCompleted() {
    setText("");
  }

  return (
    <div className="flex m-4 shadow-xs border border-gray-400 rounded-md overflow-hidden">
      <input
        name="name"
        className={`flex-1 bg-gray-100 px-4 py-2`}
        placeholder="Neue Aufgabe anlgen"
        disabled={loading}
        value={text}
        onKeyUp={onSubmitCheck}
        onChange={onChangeText}
      />
      <button className="p-2 bg-gray-400" onClick={onCreateTodo}>
        {loading ? <LoadingOutlined /> : <SaveOutlined />}
      </button>
    </div>
  );
}
