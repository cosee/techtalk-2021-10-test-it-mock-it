import React, {useState} from "react";
import {TodoRequest} from "src/model/todos";
import {addTodo} from "src/backend/addTodo";

export const NewTodoInputRow: React.FC<{onChange: () => void}> = ({onChange}) => {
    const [newTodo, setNewTodo] = useState<TodoRequest>({
        name: "",
        description: "",
    });

    async function submit() {
        await addTodo(newTodo);
        onChange()
    }

    return <tr className={"addTodoForm"}>
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
}
