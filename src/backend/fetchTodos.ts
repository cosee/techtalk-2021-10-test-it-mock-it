import axios from "axios";
import {TodoListResponse} from "src/model/todos";


export async function fetchTodos(): Promise<TodoListResponse> {
    const response = await axios.get<TodoListResponse>("/api/todos")
    return response.data
}

