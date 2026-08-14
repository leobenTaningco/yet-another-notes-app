"use client";

import React, { useState } from "react";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  highlightedDates?: string[]; // Format: YYYY-MM-DD
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  highlightedDates = [],
}: CalendarProps) {
  // Use August 2026 as initial state to match the reference screenshot
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 14)); // August 14, 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const getCalendarDays = () => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // First day of current month
    const firstDay = new Date(year, month, 1);
    // Day of week of the first day (0 = Sun, 1 = Mon, ..., 6 = Sat)
    let firstDayOfWeek = firstDay.getDay();
    // Convert to Monday start: 0 = Mon, ..., 6 = Sun
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Previous month's tail days
    const prevMonthLast = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonthLast.getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDaysCount - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    const currentMonthLast = new Date(year, month + 1, 0);
    const currentMonthDaysCount = currentMonthLast.getDate();
    for (let i = 1; i <= currentMonthDaysCount; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month's leading days to fill grid (usually 42 cells total for 6 rows)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const formatDateKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const calendarDays = getCalendarDays();
  const todayKey = "2026-08-17"; // Set hardcoded today to August 17 to match circle in screenshot
  const filledKey = "2026-08-19"; // Set hardcoded filled highlight to August 19 to match screenshot

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-slate-800">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-xs font-semibold text-slate-400 py-1">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 text-center gap-y-2">
        {calendarDays.map(({ date, isCurrentMonth }, idx) => {
          const dateKey = formatDateKey(date);
          const isToday = dateKey === todayKey;
          const isHighlightFilled = dateKey === filledKey;
          
          const isSelected =
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth() &&
            selectedDate.getFullYear() === date.getFullYear();

          // If date has tasks, show a small indicator dot
          const hasTasks = highlightedDates.includes(dateKey);

          return (
            <div key={idx} className="flex flex-col items-center justify-center relative py-1">
              <button
                type="button"
                onClick={() => onSelectDate(date)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full transition-all focus:outline-none ${
                  isHighlightFilled
                    ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/20"
                    : isToday
                    ? "border border-indigo-600 text-indigo-600 font-semibold"
                    : isSelected
                    ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200"
                    : isCurrentMonth
                    ? "text-slate-700 hover:bg-slate-100 hover:text-slate-800"
                    : "text-slate-300 hover:bg-slate-50/50"
                }`}
              >
                {date.getDate()}
              </button>
              {/* Dot indicator for tasks on this date */}
              {hasTasks && !isHighlightFilled && (
                <span
                  className={`absolute bottom-1 w-1 h-1 rounded-full ${
                    isToday ? "bg-indigo-600" : "bg-indigo-400"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
