"use client";

import {
  isDateOverdue,
  isToday,
  parseDateYMD,
  calendarDateFormatter,
  calendarDayFormatter,
  getDaysLabel,
} from "@/app/utils";
import type { CalendarItemProps } from "@/app/types";

export function CalendarItem({ task, onEdit }: CalendarItemProps) {
  if (!task.date) {
    return null;
  }

  const taskDate = parseDateYMD(task.date);
  if (!taskDate) {
    return null;
  }

  const today = isToday(taskDate);
  const overdue = isDateOverdue(taskDate);
  const [dia, mes] = calendarDateFormatter.format(taskDate).split("-");

  return (
    <button
      type="button"
      className="mb-2 flex w-full min-w-0 cursor-pointer items-center gap-2 rounded border border-white/20 bg-neutral-900/50 px-3 py-2 text-left transition hover:bg-neutral-900/5"
      onClick={() => onEdit(task)}
    >
      <div className="shrink-0 text-center">
        <div
          className={`text-sm capitalize ${today ? "text-sky-400" : overdue ? "text-red-400" : "text-neutral-500"}`}
        >
          <div className="flex flex-col text-center font-bold">
            <span className="text-sm">{mes}</span>
            <span className="text-xl">{dia}</span>
          </div>
        </div>
      </div>

      <div className="ml-4 min-w-0 flex-1 text-left">
        <div className="text-sm capitalize text-neutral-500">
          {today ? "Hoy" : calendarDayFormatter.format(taskDate)}{" "}
          {task.time?.slice(0, 5)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="block w-full truncate text-left text-sm text-neutral-400 transition hover:text-white">
            {task.title}
          </p>
        </div>
      </div>
      <div
        className={`ml-auto hidden shrink-0 px-2 py-1 text-center text-xs leading-tight xl:flex ${today ? "text-sky-400" : overdue ? "text-red-400" : "text-neutral-500"}`}
      >
        {getDaysLabel(taskDate)}
      </div>
    </button>
  );
}
