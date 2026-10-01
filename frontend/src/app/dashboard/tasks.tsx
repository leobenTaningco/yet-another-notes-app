"use client";

import React, { useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: "completed" | "pending" | "overdue";
}

interface TasksProps {
  tasks: Task[];
  onAddTask: (title: string) => void;
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function Tasks({
  tasks,
  onAddTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: TasksProps) {
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const pendingCount = tasks.filter((t) => !t.completed).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddTask(newTitle.trim());
      setNewTitle("");
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      onEditTask(id, editText.trim());
      setEditingId(null);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col flex-1 min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">My Tasks</h2>
        <span className="text-sm font-medium text-slate-500">
          {pendingCount} task{pendingCount !== 1 ? "s" : ""} pending
        </span>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddSubmit} className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-indigo-600/10 active:scale-[0.98]"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[550px] pr-1">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No tasks found. Add a new task to get started!
          </div>
        ) : (
          tasks.map((task) => {
            const isCompleted = task.completed;
            const isOverdue = task.status === "overdue" && !isCompleted;
            const isEditing = editingId === task.id;

            return (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                  isCompleted
                    ? "bg-emerald-50/20 border-emerald-100/60"
                    : isOverdue
                    ? "bg-rose-50/20 border-rose-100/60"
                    : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Custom Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className={`flex items-center justify-center w-6 h-6 rounded-lg border transition-all cursor-pointer focus:outline-none shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/10"
                        : isOverdue
                        ? "border-rose-400 hover:bg-rose-50"
                        : "border-slate-300 hover:border-indigo-400"
                    }`}
                  >
                    {isCompleted && (
                      <svg
                        className="w-4 h-4 stroke-[3]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </button>

                  {/* Task Content / Input */}
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEdit(task.id)}
                        onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                        autoFocus
                        className="w-full py-0.5 px-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    ) : (
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium transition-all truncate ${
                            isCompleted
                              ? "text-emerald-700/60 line-through"
                              : isOverdue
                              ? "text-slate-800"
                              : "text-slate-700"
                          }`}
                        >
                          {task.title}
                        </span>
                        {isOverdue && (
                          <span className="inline-flex self-start items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                            Overdue
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Task Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity ml-4 shrink-0">
                  {!isEditing && (
                    <button
                      onClick={() => startEditing(task)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit task"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.013a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
