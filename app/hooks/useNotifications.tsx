"use client";

import { useMemo } from "react";
import { CalendarDays, ListTodo } from "lucide-react";
import { useTasks } from "./useTasks";
import { parseDateYMD } from "../utils";

export function  useNotifications() {
  const { tasks, overdueTasks } = useTasks();

  const notifications = useMemo(() => { 
    const today = new Date();
    const todayTasks = tasks.filter((task) => {
      if (!task.date) {
        return false;
      }
      const taskDate = parseDateYMD(task.date);
      if (!taskDate) {
        return false;
      }
      return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
      );
    });

    const calendarNotifications =
      todayTasks.length > 0
        ? [
            {
              id: "today-events",
              icon: CalendarDays,
              title:
                todayTasks.length === 1
                  ? "Tienes 1 tarea para hoy"
                  : `Tienes ${todayTasks.length} tareas para hoy`,
            },
          ]
        : [];

    const taskNotifications =
      overdueTasks.length > 0
        ? [
            {
              id: "overdue-tasks",
              icon: ListTodo,
              title:
                overdueTasks.length === 1
                  ? "1 tarea atrasada"
                  : `${overdueTasks.length} tareas atrasadas`,
            },
          ]
        : [];

    return [
      ...taskNotifications,
      ...calendarNotifications,
    ];
  }, [tasks, overdueTasks]);

  return {
    notifications,
    count: notifications.length,
  };
}