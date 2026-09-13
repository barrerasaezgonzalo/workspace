import { CalendarDays, Circle, CircleCheck, Grip, Trash2 } from "lucide-react";
import { TaskItemProps } from "../../types";
import { useTaskItem } from "@/app/hooks/useTaskItem";
import { useDraggable } from "@dnd-kit/core";

export function TaskItem({
  task,
  onEdit,
  onDelete,
  taskGroupConfig,
}: TaskItemProps) {
  const { overdue } = useTaskItem(task, taskGroupConfig);
  const subtasks = task.subtasks ?? [];
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed,
  ).length;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      role="button"
      onClick={() => onEdit(task)}
      className={`group relative cursor-pointer rounded border bg-neutral-800 p-3 hover:bg-neutral-600/50 ${
        task.important ? "border-amber-500/50" : "border-white/20"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex w-full items-center gap-2 border-b border-white/20 pb-2 text-sm">
          {task.important && (
            <Circle
              size={12}
              fill="#fc9900"
              className="shrink-0 text-amber-500"
            />
          )}

          <span className="truncate text-neutral-200">{task.title}</span>
        </div>

        {subtasks.length > 0 && (
          <div className="mt-4 text-xs text-neutral-300">
            <p className="my-2 flex items-center gap-2">
              Subtareas {completedSubtasks}/{subtasks.length}
              <CircleCheck
                fill="#c0c0c0"
                className="text-neutral-800"
                size={15}
              />
            </p>

            <ul className="mt-2 space-y-2 text-xs">
              {subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      subtask.completed ? "bg-green-500" : "bg-neutral-600"
                    }`}
                  />

                  <span
                    className={`truncate ${
                      subtask.completed
                        ? "text-neutral-500 line-through"
                        : "text-neutral-400"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 2xl:flex-row 2xl:items-center">
        <div
          className={`inline-flex items-center gap-1 w-fit rounded-md border border-white/20 px-2 py-1 text-xs ${
            overdue ? "text-red-400" : "text-neutral-400"
          }`}
        >
          <CalendarDays size={13} />

          {task.date
            ? `Vence el ${task.date}`
            : `Creada el ${task.created_at?.split("T")[0] ?? "sin fecha"}`}
        </div>

        <div className="flex items-center gap-2 mr-auto ml-0 2xl:mr-0 2xl:ml-auto">
          <button
            type="button"
            {...listeners}
            {...attributes}
            className="flex h-8 w-8 cursor-grab items-center justify-center rounded text-neutral-500 transition hover:bg-white/5 hover:text-neutral-300 active:cursor-grabbing"
            title="Mover tarea"
          >
            <Grip size={20} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(task);
            }}
            className="shrink-0 cursor-pointer text-neutral-600 transition-colors hover:text-red-400"
            title="Eliminar tarea"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
