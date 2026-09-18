"use client";
import type { CalendarMonthProps } from "@/app/types";

export function CalendarMonth({
  tasks,
  currentDate,
  onSelectDay,
}: CalendarMonthProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: firstDay + daysInMonth }, (_, index) => {
    if (index < firstDay) return null;
    return index - firstDay + 1;
  });
  const hasTasks = (day: number) =>
    tasks.some((task) => {
      if (!task.date) return false;
      const date = new Date(`${task.date}T00:00:00`);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    });
  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="grid grid-cols-7">
      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
        <div key={day} className="py-2 text-center text-sm text-neutral-500">
          {day}
        </div>
      ))}

      {days.map((day, index) => (
        <button
          key={index}
          type="button"
          disabled={!day}
          onClick={() => day && onSelectDay?.(new Date(year, month, day))}
          className={`relative min-h-16 p-2 text-sm transition border border-white/10  ${
            day
              ? isToday(day)
                ? "cursor-pointer bg-sky-500/20 text-sky-400 ring-1 ring-sky-400/50"
                : "cursor-pointer text-neutral-300 hover:bg-neutral-900/50"
              : "cursor-default"
          }`}
        >
          {day}
          {day && hasTasks(day) && (
            <span className="absolute bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400" />
          )}
        </button>
      ))}
    </div>
  );
}
