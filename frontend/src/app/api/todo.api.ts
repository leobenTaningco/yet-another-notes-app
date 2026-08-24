import { supabase } from "../../lib/supabase";
import type {
    Todo,
    CreateTodoData,
    UpdateTodoData
} from "../types/todo.types";

async function getAccessToken() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error("Not authenticated");
    }

    return session.access_token;
}

export async function getTodos(): Promise<Todo[]> {
    const token = await getAccessToken();

    const response = await fetch(
        "http://localhost:3001/api/todos",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
}

export async function createTodo(
    data: CreateTodoData
): Promise<Todo> {
    const token = await getAccessToken();

    const response = await fetch(
        "http://localhost:3001/api/todos",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json()

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return result;
}

export async function updateTodo(
    todoId: number,
    data: UpdateTodoData
): Promise<Todo> {
    const token = await getAccessToken();

    const response = await fetch(
        `http://localhost:3001/api/todos/${todoId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return response.json();
}

export async function deleteTodo(todoId: number): Promise<void> {
    const token = await getAccessToken();

    const response = await fetch(
        `http://localhost:3001/api/todos/${todoId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }
}

