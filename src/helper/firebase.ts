import admin from 'firebase-admin';
import { FirebaseTodo } from '../types/todo';

admin.initializeApp();
const { fromDate } = admin.firestore.Timestamp;
export const collection = admin.firestore().collection('todos');
export const firestore = admin.firestore();

export async function addTodo(name: string, dueDate?: Date): Promise<FirebaseTodo> {
  const data = {
    name,
    completed: false,
    dueDate: dueDate ? fromDate(dueDate) : null,
  };

  const res = await collection.add(data);
  return {
    ...data,
    id: res.id,
    dueDate,
  };
}

export async function deleteTodo(id: string): Promise<boolean> {
  const doc = firestore.doc(`todos/${id}`);

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
