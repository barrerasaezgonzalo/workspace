"use client";

import { useMemo, useState } from "react";
import { calendarMonthFormatter, getCalendarMonthLabel } from "@/app/utils";
import { useTasks } from "./useTasks";

export function useCalendar() {
  const { filteredTasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const visibleEvents = useMemo(() => {
    return filteredTasks.filter((task) => {
      if (!task.date) {
        return false;
      }
      const taskDate = new Date(`${task.date}T00:00:00`);
      return (
        taskDate.getFullYear() === currentDate.getFullYear() &&
        taskDate.getMonth() === currentDate.getMonth()
      );
    });
  }, [filteredTasks, currentDate]);

  const handleNextMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const monthLabel = getCalendarMonthLabel(currentDate, calendarMonthFormatter);

  return {
    visibleEvents,
    currentDate,
    monthLabel,
    handleCurrentMonth,
    handleNextMonth,
    handlePreviousMonth,
  };
}
