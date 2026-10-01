"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import type { Todo as TodoType } from "../types/todo.types";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../api/todo.api";

interface TodoProps {
    user: User;
}

export default function Todo({ user }: TodoProps) {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const [title, setTitle] = useState("");
    const [bodyNote, setBodyNote] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        loadTodos();
    }, [user.id]);

    async function loadTodos() {
        try {
            const data = await getTodos();

            setTodos(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleCreateTodo() {
        if (!title.trim()) {
            return;
        }

        try {
            const newTodo = await createTodo({
                title,
                bodyNote,
            });

            setTodos((current) => [
                ...current,
                newTodo,
            ]);

            setTitle("");
            setBodyNote("");
            setShowCreate(false);

        } catch (error) {
            console.error(error);
            alert("Failed to create todo");
        }
    }

    async function handleToggleTodo(todo: TodoType) {
        try {
            const updatedTodo = await updateTodo(
                todo.todoId,
                {
                    completed: !todo.completed,
                }
            );

            setTodos((current) =>
                current.map((item) =>
                    item.todoId === updatedTodo.todoId
                        ? updatedTodo
                        : item
                )
            );

        } catch (error) {
            console.error(error);
            alert("Failed to update todo");
        }
    }

    async function handleDeleteTodo(todoId: number) {
        try {
            await deleteTodo(todoId);

            setTodos((current) =>
                current.filter(
                    (todo) => todo.todoId !== todoId
                )
            );

        } catch (error) {
            console.error(error);
            alert("Failed to delete todo");
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500">
                        Welcome back
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {user.email}'s Notes
                    </h1>
                </div>

                {/* Create button */}
                <div className="mb-6">
                    <button
                        onClick={() =>
                            setShowCreate(!showCreate)
                        }
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                    >
                        + Create Todo
                    </button>
                </div>

                {/* Create form */}
                {showCreate && (
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold">
                            Create Todo
                        </h2>

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        <textarea
                            placeholder="Notes"
                            value={bodyNote}
                            onChange={(e) =>
                                setBodyNote(e.target.value)
                            }
                            className="mb-4 min-h-24 w-full rounded-lg border border-gray-300 px-4 py-2"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateTodo}
                                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                            >
                                Create
                            </button>

                            <button
                                onClick={() =>
                                    setShowCreate(false)
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Todo list */}
                <div className="space-y-4">
                    {todos.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                            <h2 className="text-lg font-semibold text-gray-700">
                                No todos yet
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Create your first todo.
                            </p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.todoId}
                                className="rounded-xl bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2
                                            className={`text-xl font-semibold ${
                                                todo.completed
                                                    ? "text-gray-400 line-through"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {todo.title}
                                        </h2>

                                        {todo.bodyNote && (
                                            <p className="mt-2 text-gray-600">
                                                {todo.bodyNote}
                                            </p>
                                        )}

                                        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs">
                                            {todo.completed
                                                ? "Completed"
                                                : "Not completed"}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleToggleTodo(todo)
                                            }
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
                                        >
                                            {todo.completed
                                                ? "Undo"
                                                : "Complete"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteTodo(
                                                    todo.todoId
                                                )
                                            }
                                            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}