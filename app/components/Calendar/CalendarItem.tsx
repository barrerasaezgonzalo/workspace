"use client";

import { isDateOverdue, isToday, parseDateYMD } from "@/app/utils";
import type { CalendarItemProps } from "@/app/types";

export function CalendarItem({
  task,
  dateFormatter,
  dayFormatter,
  onEdit,
}: CalendarItemProps) {
  if (!task.date) {
    return null;
  }
  const taskDate = parseDateYMD(task.date);
  if (!taskDate) {
    return null;
  }
  const today = isToday(taskDate);
  const overdue = isDateOverdue(task.date);

  return (
    <div className="mb-2 flex min-w-0 items-center gap-2 border-b border-white/20 px-3 py-2 transition">
      <div className="shrink-0 text-center">
        <div
          className={`text-sm capitalize ${
            today
              ? "text-sky-400"
              : overdue
                ? "text-red-400"
                : "text-neutral-500"
          }`}
        >
          {dateFormatter.format(taskDate)}
        </div>
      </div>

      <div className="text-sm capitalize text-neutral-400">
        {today ? "Hoy" : dayFormatter.format(taskDate)}
      </div>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="block w-full cursor-pointer truncate text-left text-sm text-neutral-400 transition hover:text-white"
        >
          {task.title}
        </button>
      </div>
    </div>
  );
}