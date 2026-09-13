import { TaskGroupProps } from "../../types";
import { TaskColumn } from "./TaskColumn";

export function TaskGroup({
  taskGroupConfig,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-3 py-3 md:grid-cols-2 xl:grid-cols-3">
      {taskGroupConfig.map((group) => (
        <TaskColumn
          key={group.status}
          group={group}
          taskGroupConfig={taskGroupConfig}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
