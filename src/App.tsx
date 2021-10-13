import React, { useCallback, useEffect, useState } from "react";
import { TodoListResponse } from "src/model/todos";
import { fetchTodos } from "src/backend/fetchTodos";
import { CopyToClipboardButton } from "src/components/CopyToClipboardButton";
import { PrintButton } from "src/components/PrintButton";
import { TodoTable } from "src/components/table/TodoTable";
import { ShowError } from "src/components/ShowError";
import { ShowLoadingMessage } from "src/components/ShowLoadingMessage";

function App() {
  const [todoList, setTodoList] = useState<TodoListResponse>();
  const [error, setError] = useState<Error | null>(null);

  const loadAndUpdateTodos = useCallback(() => {
    fetchTodos()
      .then(setTodoList)
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    loadAndUpdateTodos();
  }, [loadAndUpdateTodos]);

  if (error != null) {
    return <ShowError error={error} />;
  }

  if (todoList == null) {
    return <ShowLoadingMessage />;
  }

  return (
    <div className="App">
      <div className={"actionButtons"}>
        <CopyToClipboardButton todoList={todoList} />
        <PrintButton todoList={todoList} />
      </div>
      <TodoTable todoList={todoList} onChange={() => loadAndUpdateTodos()} />
    </div>
  );
}

export default App;
