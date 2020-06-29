export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  dueDate: Date;

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirebaseTodo {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: Date;
}
