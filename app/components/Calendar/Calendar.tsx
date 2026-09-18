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
    currentDate,
  } = useCalendar();
  const { handleOpenEdit } = useTasks();

  return (
    <section className="w-full">
      <CalendarGroup
        tasks={visibleEvents}
        onEdit={handleOpenEdit}
        monthLabel={monthLabel}
        onPreviousMonth={handlePreviousMonth}
        onCurrentMonth={handleCurrentMonth}
        onNextMonth={handleNextMonth}
        currentDate={currentDate}
      />
    </section>
  );
}
