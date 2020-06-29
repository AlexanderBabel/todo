import admin from 'firebase-admin';
import { FirebaseTodo } from '../types/todo';

admin.initializeApp();
const { fromDate } = admin.firestore.Timestamp;
export const collection = admin.firestore().collection('todos');

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
  const doc = collection.doc(id);

  return await doc.delete().then(() => true);
}

export async function getTodos(): Promise<FirebaseTodo[]> {
  return Promise.all(
    (await collection.get()).docs.map(
      async (d) => ({ id: d.id, ...(await d.data()) } as FirebaseTodo)
    )
  );
}
