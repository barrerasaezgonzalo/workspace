import { Check, Circle, Plus, Trash2 } from "lucide-react";
import type { TaskSubtasksProps } from "@/app/types";

export function TaskSubtasks({
  subtasks,
  completedSubtasks,
  newSubtask,
  setNewSubtask,
  handleAddSubtask,
  handleToggleSubtask,
  handleDeleteSubtask,
}: TaskSubtasksProps) {
  return (
    <section className="border-t border-white/10 pt-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-neutral-200">Subtareas</h3>
          <p className="mt-1 text-xs text-neutral-500">
            {completedSubtasks} de {subtasks.length} finalizadas
          </p>
        </div>

        <span className="rounded bg-white/5 px-2 py-1 text-xs text-neutral-400">
          {subtasks.length}
        </span>
      </div>

      {subtasks.length > 0 && (
        <div className="overflow-hidden rounded border border-white/15">
          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="group flex min-h-11 items-center gap-3 border-b border-white/10 px-3 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => handleToggleSubtask(subtask.id)}
                className="cursor-pointer text-neutral-500 transition hover:text-neutral-200"
              >
                {subtask.completed ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-neutral-950">
                    <Check size={11} strokeWidth={3} />
                  </span>
                ) : (
                  <Circle size={16} />
                )}
              </button>

              <span
                className={`flex-1 text-sm ${
                  subtask.completed
                    ? "text-neutral-500 line-through"
                    : "text-neutral-300"
                }`}
              >
                {subtask.title}
              </span>

              <button
                type="button"
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="cursor-pointer text-neutral-600 opacity-0 transition hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <input
          value={newSubtask}
          onChange={(event) => setNewSubtask(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddSubtask();
            }
          }}
          type="text"
          placeholder="Nueva subtarea..."
          className="h-10 flex-1 rounded border border-white/15 bg-transparent px-3 text-sm text-neutral-300 outline-none placeholder:text-neutral-600 focus:border-white/40"
        />

        <button
          type="button"
          onClick={handleAddSubtask}
          disabled={!newSubtask.trim()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-white/20 text-neutral-400 transition hover:border-white/40 hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-30 hover:border-white/40"
        >
          <Plus size={17} />
        </button>
      </div>
    </section>
  );
}
