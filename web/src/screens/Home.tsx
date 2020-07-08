import React from "react";

import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

function Home() {
  return (
    <div className="flex justify-center items-center max-h-screen p-8 max-w-screen overflow-scroll">
      <div className="flex-col mx-auto w-1/4 bg-white shadow-md p-8 m-8">
        <span className="font-bold text-3xl mb-4"> Meine Aufgaben</span>
        <CreateTodo />
        <hr />
        <TodoList />
      </div>
    </div>
  );
}

export default Home;
