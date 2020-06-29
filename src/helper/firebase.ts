import admin from 'firebase-admin';
import { FirebaseTodo, FirebaseDatabaseTodo } from '../types/todo';

admin.initializeApp();
const { fromDate } = admin.firestore.Timestamp;
export const collection = admin.firestore().collection('todos');

export async function addTodo(name: string, dueDate?: Date): Promise<FirebaseTodo> {
  const data = {
    name,
    completed: false,
    dueDate: dueDate ? fromDate(dueDate) : null,
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
): Promise<boolean> {
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
    updateObj.dueDate = fromDate(dueDate);
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

export async function getTodos(): Promise<FirebaseTodo[]> {
  return Promise.all(
    (await collection.get()).docs.map(async (d) => {
      const data = await d.data();
      return {
        id: d.id,
        ...data,
        dueDate: data.dueDate ? (data.dueDate as admin.firestore.Timestamp).toDate() : null,
      } as FirebaseTodo;
    })
  );
}
