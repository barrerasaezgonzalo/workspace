"use client";

import { isDateOverdue, isToday, parseDateYMD } from "@/app/utils";
import type { CalendarItemProps } from "@/app/types";
import { useTasks } from "@/app/hooks/useTasks";

export function CalendarItem({
  task,
  dateFormatter,
  dayFormatter,
  onEdit,
}: CalendarItemProps) {
  const { taskGroupConfig } = useTasks();
  if (!task.date) {
    return null;
  }
  const taskDate = parseDateYMD(task.date);
  if (!taskDate) {
    return null;
  }
  const today = isToday(taskDate);
  const overdue = isDateOverdue(task.date);
  const [dia, mes] = dateFormatter.format(taskDate).split("-");
  const statusConfig = taskGroupConfig.find(
    (config) => config.status === task.status,
  );
  return (
    <div
      className="mb-2 flex min-w-0 items-center gap-2 border-b border-white/20 px-3 py-2 transition cursor-pointer"
      role="button"
      onClick={() => onEdit(task)}
    >
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
          <div className="flex flex-col text-center font-bold">
            <span className="text-sm">{mes}</span>
            <span className="text-xl">{dia}</span>
          </div>
        </div>
      </div>

      <div className="ml-4 min-w-0 flex-1 text-left">
        <div className="text-sm capitalize text-neutral-500">
          {today ? "Hoy" : dayFormatter.format(taskDate)}{" "}
          {task.time?.slice(0, 5)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="block w-full cursor-pointer truncate text-left text-sm text-neutral-400 transition hover:text-white">
            {task.title}
          </p>
        </div>
      </div>
      <div
        className={`hidden xl:flex ml-auto w-30 shrink-0 rounded px-2 py-1 text-center text-xs leading-tight ${statusConfig?.className ?? "bg-neutral-700 text-neutral-300"}`}
      >
        # {statusConfig?.title ?? task.status}
      </div>
    </div>
  );
}
