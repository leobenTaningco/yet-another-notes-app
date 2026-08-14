"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Tasks, { Task } from "./tasks";
import Calendar from "./calendar";
import ProgressChart from "./progress_chart";

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 14)); // Aug 14, 2026

  // Default tasks seeded to match the reference screenshot
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Completed Task",
      completed: true,
      status: "completed",
    },
    {
      id: "2",
      title: "In Progress Task 1",
      completed: false,
      status: "pending",
    },
    {
      id: "3",
      title: "In Progress Task 2",
      completed: false,
      status: "pending",
    },
    {
      id: "4",
      title: "Overdue Task",
      completed: false,
      status: "overdue",
    },
  ]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      status: "pending",
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          return {
            ...task,
            completed: nextCompleted,
            status: nextCompleted
              ? "completed"
              : task.status === "completed"
              ? "pending"
              : task.status,
          };
        }
        return task;
      })
    );
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} onChangeTab={setCurrentTab} />

      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {currentTab === "dashboard" ? (
          <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10">
            {/* Page Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Hello, User!
              </h1>
              <p className="text-slate-500 font-medium mt-1.5 text-sm">
                Here is your schedule and metrics overview for today.
              </p>
            </header>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Tasks List Container */}
              <div className="lg:col-span-2 flex flex-col h-full">
                <Tasks
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>

              {/* Sidebar Info Containers (Calendar & Progress) */}
              <div className="flex flex-col gap-8">
                <Calendar
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
                <ProgressChart tasks={tasks} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10">
            {/* Settings Page Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Settings
              </h1>
              <p className="text-slate-500 font-medium mt-1.5 text-sm">
                Manage your notes and dashboard preferences here.
              </p>
            </header>

            {/* Settings Card */}
            <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm max-w-2xl">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Dark Mode</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Toggle default system appearance theme</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Email Notifications</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Receive daily summary reports of tasks</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Auto-archive Tasks</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Move completed tasks to history after 7 days</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
