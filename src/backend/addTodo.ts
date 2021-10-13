import axios, { AxiosResponse } from "axios";
import {TodoRequest, TodoResponse} from "src/model/todos";


export async function addTodo(todo: TodoRequest): Promise<TodoResponse> {
    const response = await axios.post<TodoRequest, AxiosResponse<TodoResponse>>("/api/todos", todo)
    return response.data
}

