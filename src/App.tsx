import React, { useEffect, useState } from "react";
import { TodoListResponse, TodoRequest } from "src/model/todos";
import { fetchTodos } from "src/backend/fetchTodos";
import { addTodo } from "src/backend/addTodo";
import {AxiosError} from "axios";

function App() {
  const [todoList, setTodoList] = useState<TodoListResponse>();
  const [newTodo, setNewTodo] = useState<TodoRequest>({
    name: "",
    description: "",
  });

  const [error, setError] = useState<AxiosError<{message: string}> | null>(null);

  useEffect(() => {
    fetchTodos().then(setTodoList).catch(setError);
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
        {todoList.todos.map((todo) => {
          return (
            <tr className="todo" key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
