"use client";

import { useCalendar } from "@/app/hooks/useCalendar";
import { CalendarGroup } from "./CalendarGroup";
import { useTasks } from "@/app/hooks/useTasks";

export function Calendar() {
  const {
    visibleEvents,
    monthLabel,
    handleCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useCalendar();
  const { handleOpenEdit } = useTasks();

  return (
    <section className="w-full pt-4">
      <CalendarGroup
        tasks={visibleEvents}
        onEdit={handleOpenEdit}
        monthLabel={monthLabel}
        onPreviousMonth={handlePreviousMonth}
        onCurrentMonth={handleCurrentMonth}
        onNextMonth={handleNextMonth}
      />
    </section>
  );
}
