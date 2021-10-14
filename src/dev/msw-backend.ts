import { rest, setupWorker } from "msw";
import { TodoRequest, TodoResponse } from "src/model/todos";

export async function startMswApi(): Promise<void> {
  const todos: TodoResponse[] = [
    { id: 1, name: "Get up", description: "Out of the bed!" },
    { id: 2, name: "Break-feast", description: "Ham & Eggs" },
  ];
  let idCounter = 3;

  const getTodosMock = rest.get("/api/todos", (req, res, context) => {
    return res(context.json({ todos }));
  });

  const addTodoMock = rest.post<TodoRequest>("/api/todos", (req, res, context) => {
    todos.push({ ...req.body, id: idCounter++ });
    return res(context.status(204));
  });
  const worker = setupWorker(
    getTodosMock,
    addTodoMock
  );
  await worker.start();
}
