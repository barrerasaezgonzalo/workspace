import type { LucideIcon } from "lucide-react";

type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: number;
  user_id: string;
  title: string;
  status: TaskStatus;
  date?: string | null;
  important: boolean;
  summary?: string | null;
  createdAt?: string;
  time?: string;
  subtasks?: Subtask[];
};

export type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  confirming?: boolean;
};

export type TaskFormData = {
  title: string;
  summary: string;
  date: string;
  time?: string;
  important: boolean;
  subtasks?: Subtask[];
};

export type TaskGroupConfig = {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  emptyMessage: string;
  icon: LucideIcon;
  className: string;
  bg: string;
  border: string;
};

export type TaskGroupProps = {
  taskGroupConfig: TaskGroupConfig[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSubmit: (data: TaskFormData) => Promise<void> | void;
}

export type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskSubtasksProps = {
  subtasks: Subtask[];
  completedSubtasks: number;
  newSubtask: string;
  setNewSubtask: (value: string) => void;
  handleAddSubtask: () => void;
  handleToggleSubtask: (id: number) => void;
  handleDeleteSubtask: (id: number) => void;
};

export type TaskColumnProps = {
  group: TaskGroupConfig;
  onEdit: (task: TaskGroupConfig["tasks"][number]) => void;
  onDelete: (task: TaskGroupConfig["tasks"][number]) => void;
};
