import React, { useState, useRef, useEffect } from "react";

import { useMutation } from "@apollo/client";

import { Todo } from "../types/todo";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import {
  UPDATE_TODO_MUTATION,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "../gql/mutations";
import TodoDeleteButton from "./TodoDeleteButton";
import TodoCompletedSwitch from "./TodoCompletedSwitch";

export type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [text, setText] = useState(todo.name);

  const refInput = useRef<HTMLInputElement | null>(null);

  const [updateTodoText, { loading: loadingUpdateText }] = useMutation<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >(UPDATE_TODO_MUTATION, {
    onCompleted: onCompletedUpdateTodoText,
    onError: () => {},
  });

  useEffect(() => {
    setText(todo.name);
  }, [todo.name]);

  useEffect(() => {
    if (edit) {
      refInput.current?.focus();
    }
  }, [edit]);

  function onStartEdit() {
    if (!edit) {
      setEdit(true);
    }
  }

  function onUpdateTodo() {
    if (text) {
      updateTodoText({ variables: { data: { id: todo.id, name: text } } });
    }
  }

  function onSubmitCheck(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onUpdateTodo();
    }
  }

  function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onCompletedUpdateTodoText() {
    setEdit(false);
  }

  return (
    <div
      className="flex items-center cursor-pointer m-4 px-6 shadow-md rounded-md bg-gray-200"
      key={todo.id}
    >
      <TodoCompletedSwitch todo={todo} />
      {!edit && (
        <span
          className={`flex-1 py-4 font-medium ${
            !todo.completed ? "hover:cursor-pointer" : "line-through"
          }`}
          onClick={onStartEdit}
        >
          {text}
        </span>
      )}
      {edit && (
        <div className="flex flex-1 shadow-xs border border-gray-400 rounded-md overflow-hidden my-2">
          <input
            name="name"
            className={`flex-1 bg-gray-100 px-4 py-2`}
            placeholder="Neue Aufgabe anlgen"
            disabled={loadingUpdateText}
            value={text}
            ref={refInput}
            onKeyUp={onSubmitCheck}
            onChange={onChangeText}
            onBlur={onUpdateTodo}
            autoComplete="none"
          />
          <button className="px-2 bg-gray-400" onClick={onUpdateTodo}>
            {loadingUpdateText ? <LoadingOutlined /> : <SaveOutlined />}
          </button>
        </div>
      )}
      <TodoDeleteButton todo={todo} />
    </div>
  );
}
