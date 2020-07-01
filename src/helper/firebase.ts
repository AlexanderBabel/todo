import admin from 'firebase-admin';

import { FirebaseDatabaseTodo, Todo } from '../types/todo';
import dayjs from 'dayjs';

admin.initializeApp();
const { fromDate } = admin.firestore.Timestamp;
export const collection = admin.firestore().collection('todos');

export async function addTodo(name: string, dueDate?: Date): Promise<Todo> {
  const data = {
    name,
    completed: false,
    dueDate: dueDate ? fromDate(dayjs(dueDate).toDate()) : null,
  } as FirebaseDatabaseTodo;

  const res = await collection.add(data);
  return {
    ...data,
    id: res.id,
    dueDate,
  };
}

export async function updateTodo(
  id: string,
  name?: string,
  dueDate?: Date,
  completed?: boolean
): Promise<boolean | FirebaseDatabaseTodo> {
  const doc = collection.doc(id);
  const todo = await doc.get();
  if (!todo.exists) {
    return false;
  }

  const updateObj = {} as FirebaseDatabaseTodo;
  if (name) {
    updateObj.name = name;
  }

  if (dueDate) {
    updateObj.dueDate = fromDate(dayjs(dueDate).toDate());
  }

  if (completed !== undefined) {
    updateObj.completed = completed;
  }

  return doc
    .update(updateObj)
    .then(() => true)
    .catch(() => false);
}

export async function deleteTodo(id: string): Promise<boolean> {
  const doc = collection.doc(id);

  return await doc.delete().then(() => true);
}

export async function getTodos(): Promise<Todo[]> {
  return Promise.all(
    (await collection.get()).docs.map(async (d) => {
      const data = await d.data();
      return {
        id: d.id,
        ...data,
        dueDate: data.dueDate ? (data.dueDate as admin.firestore.Timestamp).toDate() : null,
      } as Todo;
    })
  );
}

export async function getTodo(id: string): Promise<undefined | Todo> {
  const doc = collection.doc(id);
  const todoRef = await doc.get();

  if (!todoRef.exists) {
    return undefined;
  }

  const todoData = await todoRef.data();

  if (todoData === undefined) {
    return undefined;
  }

  return {
    id: todoRef.id,
    ...todoData,
    dueDate: todoData.dueDate ? (todoData.dueDate as admin.firestore.Timestamp).toDate() : null,
  } as Todo;
}
