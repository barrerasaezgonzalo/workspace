import { Task } from ".";

export type CalendarGroupProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onPreviousMonth: () => void;
  onCurrentMonth: () => void;
  onNextMonth: () => void;
  monthLabel: string;
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
