import { useDroppable } from "@dnd-kit/core";
import type { TaskGroupConfig } from "../../types";
import { TaskItem } from "./TaskItem";

type TaskColumnProps = {
  group: TaskGroupConfig;
  taskGroupConfig: TaskGroupConfig[];
  onEdit: (task: TaskGroupConfig["tasks"][number]) => void;
  onDelete: (task: TaskGroupConfig["tasks"][number]) => void;
};

export function TaskColumn({
  group,
  taskGroupConfig,
  onEdit,
  onDelete,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id: group.status,
  });

  return (
    <section
      ref={setNodeRef}
      className="min-w-ms rounded border border-white/20 bg-neutral-900 px-4 pt-2 pb-4"
    >
      <div className="mb-2 flex items-center justify-between px-1 py-2">
        <div className="flex w-full items-center gap-2">
          <h2 className="text-sm text-neutral-200">{group.title}</h2>

          <div
            className={`ml-auto rounded-md border border-white/20 px-2 py-0.5 text-xs ${group.className}`}
          >
            {group.tasks.length}
          </div>
        </div>
      </div>

      {group.tasks.length > 0 ? (
        <div className="space-y-4">
          {group.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              taskGroupConfig={taskGroupConfig}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-12 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-center text-sm text-neutral-500">
            {group.emptyMessage}
          </p>
        </div>
      )}
    </section>
  );
}
