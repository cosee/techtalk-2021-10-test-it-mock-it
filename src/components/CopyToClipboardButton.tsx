import React from "react";
import {TodoListResponse} from "src/model/todos";


async function copyToClipboard(todoList: TodoListResponse): Promise<void> {
  const clipboardText = todoList.todos
    .map((todo) => `${todo.name}\t${todo.description}\n`)
    .join("");
  await navigator.clipboard.writeText(clipboardText);
}

export const CopyToClipboardButton: React.FC<{ todoList: TodoListResponse }> = ({
  todoList,
}) => {
  return (
      <button onClick={() => copyToClipboard(todoList)}>
        Copy to clipboard
      </button>
  );
};
