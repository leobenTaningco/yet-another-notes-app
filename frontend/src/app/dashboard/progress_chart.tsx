"use client";

import React from "react";
import { Task } from "./tasks";

interface ProgressChartProps {
  tasks: Task[];
}

export default function ProgressChart({ tasks }: ProgressChartProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const overdue = tasks.filter((t) => t.status === "overdue" && !t.completed).length;
  const pending = total - completed - overdue;

  // Calculate percentages
  const completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingPct = total > 0 ? Math.round((pending / total) * 100) : 0;
  const overduePct = total > 0 ? Math.round((overdue / total) * 100) : 0;

  // SVG parameters
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // 314.159

  // Calculate stroke-dasharray values
  const completedStroke = (completedPct / 100) * circumference;
  const pendingStroke = (pendingPct / 100) * circumference;
  const overdueStroke = (overduePct / 100) * circumference;

  // Offsets (starting from top, which is -90deg or 270deg)
  const completedOffset = circumference; // Start at the beginning
  const pendingOffset = circumference - completedStroke;
  const overdueOffset = circumference - completedStroke - pendingStroke;

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col w-full">
      <h3 className="text-base font-bold text-slate-800 mb-6">Task Statistics</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Donut Chart SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Empty base circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-slate-100 fill-none"
              strokeWidth="12"
            />
            {total === 0 ? (
              // Empty state segment
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-slate-200 fill-none"
                strokeWidth="12"
              />
            ) : (
              <>
                {/* Completed (Green) segment */}
                {completedPct > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-emerald-500 fill-none transition-all duration-500 ease-out"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={completedOffset}
                    strokeLinecap="round"
                  />
                )}
                {/* Pending (Blue) segment */}
                {pendingPct > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-indigo-500 fill-none transition-all duration-500 ease-out"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={pendingOffset}
                    // Avoid overlapping rounded caps if multiple segments are present
                    strokeLinecap={completedPct === 0 && overduePct === 0 ? "round" : "butt"}
                  />
                )}
                {/* Overdue (Red) segment */}
                {overduePct > 0 && (
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-rose-500 fill-none transition-all duration-500 ease-out"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={overdueOffset}
                    strokeLinecap={completedPct === 0 && pendingPct === 0 ? "round" : "butt"}
                  />
                )}
              </>
            )}
          </svg>

          {/* Central Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-800 leading-none">
              {total}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5 tracking-wider uppercase">
              Task{total !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-3.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Completed</span>
            </div>
            <span className="text-slate-500 font-bold">{completedPct}%</span>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
              <span>Pending</span>
            </div>
            <span className="text-slate-500 font-bold">{pendingPct}%</span>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span>Overdue</span>
            </div>
            <span className="text-slate-500 font-bold">{overduePct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
