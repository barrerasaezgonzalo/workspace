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
  monthLabel,
  onEdit,
}: CalendarGroupProps) {
  return (
    <div className="px-3 py-4">
      <div className="mb-4 flex w-full items-center justify-between border-b border-white/20 pb-2">
        <CalendarDays className="h-6 w-6 text-blue-400" />

        <span className="mr-auto hidden pl-4 text-base font-medium capitalize text-neutral-300 xl:flex">
          {monthLabel}
        </span>

        <CalendarButtons
          onPreviousMonth={onPreviousMonth}
          onCurrentMonth={onCurrentMonth}
          onNextMonth={onNextMonth}
        />
      </div>

      <div className="custom-scroll h-[400px] overflow-x-hidden overflow-y-auto pr-2">
        {tasks.length > 0 ? (
          <div className="flex flex-col gap-1">
            {tasks.map((task) => (
              <CalendarItem key={task.id} task={task} onEdit={onEdit} />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-base text-neutral-500">No hay tareas este mes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
