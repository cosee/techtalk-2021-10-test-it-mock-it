import { TodoResponse } from "src/model/todos";
import React from "react";

export const TodoRow: React.FC<{ todo: TodoResponse }> = ({ todo }) => {
  return (
    <tr className="todo">
      <td>{todo.name}</td>
      <td>{todo.description}</td>
    </tr>
  );
};
