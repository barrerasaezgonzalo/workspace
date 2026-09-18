import { Task } from ".";

export type CalendarGroupProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  monthLabel: string;
  currentDate: Date;
};

export type CalendarItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
};
export type CalendarButtonsProps = {
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
};

export type CalendarMonthProps = {
  tasks: Task[];
  currentDate: Date;
  onSelectDay?: (date: Date) => void;
};
