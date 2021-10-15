import React, { useEffect, useState } from "react";
import { TodoListResponse, TodoRequest } from "src/model/todos";
import { fetchTodos } from "src/backend/fetchTodos";
import { addTodo } from "src/backend/addTodo";
import { printHtml } from "src/utils/print";

function App() {
  const [todoList, setTodoList] = useState<TodoListResponse>();
  const [newTodo, setNewTodo] = useState<TodoRequest>({
    name: "",
    description: "",
  });

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTodos()
      .then(setTodoList)
      .catch((error) => {
        setError(error);
      });
  }, []);

  async function submit() {
    await addTodo(newTodo);
    const todos = await fetchTodos();
    setTodoList(todos);
  }

  if (error != null) {
    return (
      <div>
        <h1>An error occurred while loading todos</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (todoList == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td colSpan={3} align={"center"}>
              <button onClick={() => printHtml(createPrintHtml(todoList))}>
                Print
              </button>
              <button onClick={() => copyToClipboard(todoList)}>Copy to clipboard</button>
            </td>
          </tr>
          <tr className={"addTodoForm"}>
            <td>
              <input
                type={"text"}
                placeholder={"Name"}
                onChange={(event) =>
                  setNewTodo((newTodo) => ({
                    ...newTodo,
                    name: event.target.value,
                  }))
                }
              />
            </td>
            <td>
              <input
                type={"text"}
                placeholder={"Description"}
                onChange={(event) =>
                  setNewTodo((newTodo) => ({
                    ...newTodo,
                    description: event.target.value,
                  }))
                }
              />
            </td>
            <td>
              <button onClick={submit}>+</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {todoList.todos.map((todo) => {
            return (
              <tr className="todo" key={todo.id}>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function createPrintHtml(todoList: TodoListResponse): string {
  return `<html lang="en">
<body>
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    ${todoList.todos.map(
      (todo) => `<tr><td>${todo.name}</td><td>${todo.description}</td></tr>`
    )}
    </tbody>
</table>
</body>
</html>
`;
}

async function copyToClipboard(todoList: TodoListResponse): Promise<void> {
  const clipboardText = todoList.todos
    .map((todo) => `${todo.name}\t${todo.description}\n`)
    .join("");
  await navigator.clipboard.writeText(clipboardText);
}

export default App;
