import dayjs from 'dayjs';
import { Todo } from '../types/todo';

const todos: [Todo] = [
  {
    id: 0,
    name: 'SE Komplexübung 1',
    completed: false,
    dueDate: dayjs('01.08.2020').toDate(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  },
];
let lastId = todos.length;

export function addTodo(name: string, dueDate: Date): boolean {
  todos.push({
    id: lastId++,
    name,
    dueDate,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
  });

  return true;
}

export function getTodos(): [Todo] {
  return todos;
}

export function updateTodo(
  id: number,
  name?: string,
  dueDate?: Date,
  completed?: boolean
): boolean {
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    return false;
  }

  const todo = todos[todoIndex];
  todos[todoIndex] = {
    ...todo,
    name: name ?? todo.name,
    dueDate: dueDate ?? todo.dueDate,
    completed: completed ?? todo.completed,
    updatedAt: new Date(),
  };

  return true;
}
