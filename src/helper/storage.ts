import dayjs from 'dayjs';
import { Todo } from '../types/todo';

const todos: [Todo] = [
  {
    id: '0',
    name: 'SE Komplexübung 1',
    completed: false,
    dueDate: dayjs('01.08.2020').toDate(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
];
let lastId = todos.length;

export function addTodo(name: string, dueDate: Date): Todo {
  const length: number = todos.push({
    id: `${lastId++}`,
    name,
    dueDate,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  });

  return todos[length - 1];
}

export function getTodos(): [Todo] {
  return todos;
}

export function getTodo(id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

export function updateTodo(
  id: string,
  name?: string,
  dueDate?: Date,
  completed?: boolean
): Todo | boolean {
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    return false;
  }

  const todo = todos[todoIndex];
  todos[todoIndex] = {
    ...todo,
    id,
    name: name ?? todo.name,
    dueDate: dueDate ?? todo.dueDate,
    completed: completed ?? todo.completed,
    updatedAt: new Date(),
  };

  return todos[todoIndex];
}

export function deleteTodo(id: string): boolean {
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    return false;
  }

  todos.splice(todoIndex, 1);
  return true;
}
