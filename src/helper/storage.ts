import dayjs from 'dayjs';
import Todo from '../types/todo';

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
