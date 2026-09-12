import { Dispatch, SetStateAction } from "react";

export function parseDateYMD(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function isDateOverdue(date: string) {
  const taskDate = parseDateYMD(date);

  if (!taskDate) {
    return false;
  }

  const today = new Date();

  taskDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return taskDate < today;
}
export function isInvalidTitle(title: string, minLength = 5) {
  return title.trim().length < minLength;
}

export function isToday(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function showResponseMessage(
  setMessage: Dispatch<SetStateAction<string>>,
  message: string,
  duration = 4000,
) {
  setMessage(message);

  setTimeout(() => {
    setMessage("");
  }, duration);
}

export function getCalendarMonthLabel(
  currentDate: Date,
  formatter: Intl.DateTimeFormat,
) {
  return formatter
    .format(currentDate)
    .replace(" de ", " ");
}

export const calendarMonthFormatter =
  new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
  });

export const calendarDateFormatter =
  new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  });

export const calendarDayFormatter =
  new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
  });