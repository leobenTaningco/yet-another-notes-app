export interface Todo {
    todoId: number;
    title: string;
    bodyNote: string | null;
    completed: boolean;
}

export interface UpdateTodoData{
    title?: string;
    bodyNote?: string | null;
    completed?: boolean;
}