import {TodoListResponse} from "src/model/todos";
import {printHtml} from "src/utils/print";
import React from "react";

export const PrintButton: React.FC<{todoList: TodoListResponse}> = ({todoList}) => {
    return <button onClick={() => printHtml(createPrintHtml(todoList))}>
        Print
    </button>
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
