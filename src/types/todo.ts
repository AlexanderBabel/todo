import { firestore } from 'firebase-admin';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: Date;
}

export interface FirebaseDatabaseTodo {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: firestore.Timestamp;
}
