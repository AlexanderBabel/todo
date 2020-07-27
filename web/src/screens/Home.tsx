import React from "react";

import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import { Footer } from "../components/Footer";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen p-8">
      <div className="mx-auto lg:w-1/3 md:w-1/2 sm:w-3/4 bg-white shadow-md p-8">
        <span className="font-bold text-3xl mb-4"> Meine Aufgaben</span>
        <CreateTodo />
        <hr />
        <TodoList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
