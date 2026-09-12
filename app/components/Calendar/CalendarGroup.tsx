"use client";

import { CalendarDays } from "lucide-react";
import type { CalendarGroupProps } from "@/app/types";
import { CalendarItem } from "./CalendarItem";
import { CalendarButtons } from "./CalendarButtons";

export function CalendarGroup({
  tasks,
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
  dateFormatter,
  dayFormatter,
  monthLabel,
  onEdit
}: CalendarGroupProps) {
  return (
    <div className="px-3 py-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <CalendarDays className="h-6 w-6 text-red-400" />

        <span className="mr-auto pl-4 text-base font-medium capitalize text-neutral-300">
          {monthLabel}
        </span>

        <CalendarButtons
          onPreviousMonth={onPreviousMonth}
          onCurrentMonth={onCurrentMonth}
          onNextMonth={onNextMonth}
        />
      </div>

      {tasks.length > 0 ? (
        <div className="mt-2">
          {tasks.map((task) => (
            <CalendarItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              dateFormatter={dateFormatter}
              dayFormatter={dayFormatter}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center">
          <p className="text-base text-neutral-500">
            No hay tareas este mes.
          </p>
        </div>
      )}
    </div>
  );
}