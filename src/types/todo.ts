import { firestore } from 'firebase-admin';

export interface FirebaseDatabaseTodo {
  user: string;
  name: string;
  completed: boolean;
  dueDate?: firestore.Timestamp;
}
