import { CalendarDays, CalendarOff, ChartPie, Plus, Siren } from "lucide-react";
import { TaskGroupProps } from "../../types";
import { TaskColumn } from "./TaskColumn";
import { useTasks } from "@/app/hooks/useTasks";
import { useNotifications } from "@/app/hooks/useNotifications";

export function TaskGroup({
  taskGroupConfig,
  onEdit,
  onDelete,
}: TaskGroupProps) {
  const {
    handleOpenCreate,
    doneTasks,
    totalTasks,
    setShowCalendarTasks,
    showCalendarTasks,
  } = useTasks();
  const { notifications } = useNotifications();
  const overdueAlert = notifications.find(
    (alert) => alert.id === "overdue-tasks",
  );
  const todayEvents = notifications.find(
    (alert) => alert.id === "today-events",
  );
  const avg = Math.round((doneTasks.length / totalTasks) * 100);
  return (
    <div>
      <div className="flex pr-4 items-center justify-between">
        <div className="pl-4 text-base font-medium text-neutral-300 flex gap-2">
          <div
            className={`flex items-center gap-2 ${avg < 30 ? "text-red-500" : avg < 70 ? "text-neutral-500" : "text-green-700"} `}
          >
            <ChartPie size={25} />
            <p>{avg}% </p>
            <p className="text-neutral-300">Tareas ({totalTasks})</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCalendarTasks((current) => !current)}
            className="cursor-pointer text-sm text-neutral-400"
          >
            {showCalendarTasks ? (
              <CalendarOff size={20} />
            ) : (
              <CalendarDays size={20} />
            )}
          </button>
        </div>
        <div className="text-base font-medium flex gap-2">
          {overdueAlert && (
            <span className="flex items-center gap-2 text-red-500">
              <Siren size={25} className="mb-1" />
              <p className="pt-1">{overdueAlert?.length}</p>
            </span>
          )}

          {todayEvents && (
            <span className="flex items-center gap-2 text-sky-400">
              <CalendarDays size={25} />
              <p className="pt-1">{todayEvents?.length}</p>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="flex gap-1 items-center bg-neutral-900 cursor-pointer rounded-lg border border-white/20 p-2 text-xs font-medium text-neutral-400 transition-colors hover:border-white/50 hover:text-neutral-300"
          title="Nueva Tarea"
        >
          <Plus size={16} /> Crear
        </button>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 px-3 py-3 md:grid-cols-2 xl:grid-cols-3 ">
        {taskGroupConfig.map((group) => (
          <TaskColumn
            key={group.status}
            group={group}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
