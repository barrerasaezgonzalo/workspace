import { TaskGroupProps } from "../../types";
import { TaskItem } from "./TaskItem";

export function TaskGroup({
  taskGroupConfig,
  onEdit,
  onDelete,
}: TaskGroupProps) {

  return (
    <div className="grid grid-cols-1 gap-4 px-3 py-3 lg:grid-cols-3">
      {taskGroupConfig.map((group) => (
        <section
          key={group.status}
          className={`min-w-ms rounded border border-white/20 bg-neutral-900 p-3`} >
          <div className="flex items-center justify-between px-1 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-100">
                {group.title}
              </h2>

              <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                {group.tasks.length}
              </span>
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
      ))}
    </div>
  );
}
