import admin from 'firebase-admin';

import { FirebaseDatabaseTodo } from '../types/todo';
import dayjs from 'dayjs';
import { Todo } from '../graphql/typeDefs/Todo';

admin.initializeApp();
const { fromDate } = admin.firestore.Timestamp;
export const collection = admin.firestore().collection('todos');

export async function addTodo(user: string, name: string, dueDate?: Date): Promise<Todo> {
  const data = {
    name,
    user,
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
  user: string,
  name?: string,
  dueDate?: Date,
  completed?: boolean
): Promise<boolean> {
  const doc = collection.doc(id);
  const todo = await doc.get();
  if (!todo.exists) {
    return false;
  }

  const todoData = todo.data() as FirebaseDatabaseTodo | undefined;
  if (todoData === undefined || todoData.user !== user) {
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

export async function deleteTodo(id: string, user: string): Promise<boolean> {
  const doc = collection.doc(id);
  const todoRef = await doc.get();
  if (!todoRef.exists) {
    return false;
  }

  const todoData = todoRef.data() as FirebaseDatabaseTodo | undefined;
  if (todoData === undefined || todoData.user !== user) {
    return false;
  }

  return await doc.delete().then(() => true);
}

export async function getTodos(user: string): Promise<Todo[]> {
  return (await collection.where('user', '==', user).get()).docs.map((d) => {
    const data = d.data() as FirebaseDatabaseTodo;
    return {
      id: d.id,
      ...data,
      dueDate: data.dueDate ? (data.dueDate as admin.firestore.Timestamp).toDate() : null,
    } as Todo;
  });
}

export async function getTodo(id: string, user: string): Promise<undefined | Todo> {
  const doc = collection.doc(id);
  const todoRef = await doc.get();
  if (!todoRef.exists) {
    return undefined;
  }

  const todoData = todoRef.data() as FirebaseDatabaseTodo | undefined;
  if (todoData === undefined || todoData.user !== user) {
    return undefined;
  }

  return {
    id: todoRef.id,
    ...todoData,
    dueDate: todoData.dueDate ? (todoData.dueDate as admin.firestore.Timestamp).toDate() : null,
  } as Todo;
}
