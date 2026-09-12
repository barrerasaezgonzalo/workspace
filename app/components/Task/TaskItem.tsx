import { CalendarDays, SquareCheck, SquarePen, Trash2 } from "lucide-react";
import { TaskItemProps } from "../../types";
import { useTaskItem } from "@/app/hooks/useTaskItem";

export function TaskItem({
  task,
  onEdit,
  onDelete,
  taskGroupConfig,
}: TaskItemProps) {
  const { overdue } = useTaskItem(task, taskGroupConfig);

  return (
    <div
      className={`group relative rounded border bg-neutral-800 p-3 hover:bg-neutral-600/50 ${
        task.important
          ? "border-amber-500/50"
          : "border-neutral-800"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="min-w-0 flex-1 cursor-pointer truncate text-left text-base font-medium leading-6 text-neutral-4  00 transition hover:text-white"
            title="Editar tarea"
          >
            {task.title}
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="shrink-0 cursor-pointer text-neutral-600 transition-colors hover:text-neutral-200"
              title="Editar tarea"
            >
              <SquarePen size={20} className="mt-0.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(task)}
              className="shrink-0 cursor-pointer text-neutral-600 transition-colors hover:text-red-400"
              title="Eliminar tarea"
            >
              <Trash2 size={20} className="shrink-0" />
            </button>
          </div>
        </div>

        {task.summary && (
          <p className="mt-2 text-xs leading-5 text-neutral-500">
            {task.summary}
          </p>
        )}


        <div>
        <p className="flex   items-center gap-2"><SquareCheck size= {20} />item 2</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        {task.date && (
          <div
            className={`mt-2 inline-flex items-center gap-1 rounded-md border border-white/20 px-2 py-1 text-xs ${
              overdue ? "text-red-400" : "text-neutral-400"
            }`}
          >
            <CalendarDays size={13} />
            {task.date}
          </div>
        )}
      </div>
    </div>
  );
}