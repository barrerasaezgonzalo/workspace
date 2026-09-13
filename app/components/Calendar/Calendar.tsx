"use client";

import type { CalendarProps } from "@/app/types";
import { useCalendar } from "@/app/hooks/useCalendar";
import { CalendarGroup } from "./CalendarGroup";

export function Calendar({ onEdit }: CalendarProps) {
  const {
    visibleEvents,
    monthLabel,
    dateFormatter,
    dayFormatter,
    handleCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useCalendar();

  return (
    <section className="w-full pt-4">
      <CalendarGroup
        tasks={visibleEvents}
        onEdit={onEdit}
        monthLabel={monthLabel}
        onPreviousMonth={handlePreviousMonth}
        onCurrentMonth={handleCurrentMonth}
        onNextMonth={handleNextMonth}
        dateFormatter={dateFormatter}
        dayFormatter={dayFormatter}
      />
    </section>
  );
}
