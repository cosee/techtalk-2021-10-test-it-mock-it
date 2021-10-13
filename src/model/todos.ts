
export interface TodoResponse {
    id: number;
    name: string;
    description: string
}

export interface TodoRequest {
    name: string;
    description: string
}

export interface TodoListResponse {
    todos: TodoResponse[]
}
