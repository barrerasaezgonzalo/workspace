import { Task } from ".";


export type CalendarGroupProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
  monthLabel: string;
};

export type CalendarItemProps = {
  task: Task;
  dateFormatter: Intl.DateTimeFormat;
  dayFormatter: Intl.DateTimeFormat;
  onEdit: (task: Task) => void;
};
export type CalendarButtonsProps = {
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
};

export type CalendarProps = {
  onEdit: (task: Task) => void;
};

