import { TodoListResponse } from "src/model/todos";
import React from "react";
import { NewTodoInputRow } from "src/components/table/NewTodoInputRow";
import { TodoRow } from "src/components/table/TodoRow";

export const TodoTable: React.FC<{
  todoList: TodoListResponse;
  onChange: () => void;
}> = ({ todoList, onChange }) => {
  return (
    <table>
      <thead>
        <NewTodoInputRow onChange={onChange} />
      </thead>
      <tbody>
        {todoList.todos.map((todo) => <TodoRow key={todo.id} todo={todo}/>)}
      </tbody>
    </table>
  );
};
