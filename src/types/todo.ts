export default interface Todo {
  id: number;
  name: string;
  completed: boolean;
  dueDate: Date;

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
