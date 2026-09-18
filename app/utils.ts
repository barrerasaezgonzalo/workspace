import { Dispatch, SetStateAction } from "react";

export function parseDateYMD(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}
export function isDateOverdue(date: string | Date) {
  const taskDate =
    typeof date === "string" ? parseDateYMD(date) : new Date(date);
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

export function getFormattedToday() {
  return new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string) {
  if (!dateString) return "sin fecha";

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
    }).format(new Date(Number(year), Number(month) - 1, Number(day)));
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function getCalendarMonthLabel(
  currentDate: Date,
  formatter: Intl.DateTimeFormat,
) {
  return formatter.format(currentDate).replace(" de ", " ");
}

export const calendarMonthFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "long",
  year: "numeric",
});

export const calendarDateFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "2-digit",
  month: "short",
});

export const calendarDayFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
});

function getDaysDifference(date: Date) {
  const targetDate = new Date(date);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.round(
    (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function getDaysLabel(date: Date) {
  const days = getDaysDifference(date);

  if (days === 0) return "Hoy";
  if (days > 0) return `Faltan ${days} días`;

  return `Hace ${Math.abs(days)} días`;
}
