"use client";

import { CalendarDays, List } from "lucide-react";
import type { CalendarGroupProps } from "@/app/types";
import { CalendarItem } from "./CalendarItem";
import { CalendarButtons } from "./CalendarButtons";
import { useState } from "react";
import { CalendarMonth } from "./CalendarMonth";

export function CalendarGroup({
  tasks,
  onPreviousMonth,
  onCurrentMonth,
  onNextMonth,
  monthLabel,
  onEdit,
  currentDate,
}: CalendarGroupProps) {
  const [view, setView] = useState<"list" | "month">("list");
  return (
    <div className="py-2">
      <div className="mb-4 flex w-full items-center justify-start gap-2">
        <CalendarDays className="h-6 w-6 text-sky-400" />

        <span className="hidden pl-4 text-base font-medium capitalize text-neutral-300 xl:flex">
          {monthLabel}
        </span>

        <button
          type="button"
          className="cursor-pointer text-neutral-400 ml-8"
          onClick={() =>
            setView((current) => (current === "list" ? "month" : "list"))
          }
        >
          {view === "list" ? <CalendarDays size={20} /> : <List size={20} />}
        </button>

        <div className="ml-auto">
          <CalendarButtons
            onPreviousMonth={onPreviousMonth}
            onCurrentMonth={onCurrentMonth}
            onNextMonth={onNextMonth}
          />
        </div>
      </div>

      <div className="custom-scroll h-[380px] overflow-x-hidden overflow-y-auto pr-2">
        {view === "list" ? (
          tasks.length > 0 ? (
            <div className="flex flex-col gap-1">
              {tasks.map((task) => (
                <CalendarItem key={task.id} task={task} onEdit={onEdit} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-base text-neutral-500">
                No hay tareas este mes.
              </p>
            </div>
          )
        ) : (
          <CalendarMonth
            tasks={tasks}
            currentDate={currentDate}
            onSelectDay={() => setView("list")}
          />
        )}
      </div>
    </div>
  );
}
