export const todosQuery = `{
  todos {
    id
    name
    completed
    dueDate
  }
}`;

export const todoQuery = `{
  todo(id: "we121ew") {
    id
    name
    completed
    dueDate
  }
}`;

export const createTodoQuery = `
mutation createTodo {
  createTodo(name: "Test #2") {
    id
    name
    completed
    dueDate
  }
}`;

export const createTodo2Query = `
mutation createTodo {
  createTodo(name: "Test #2", dueDate: "2020-01-01T00:00:00.000Z") {
    id
    name
    completed
    dueDate
  }
}`;
