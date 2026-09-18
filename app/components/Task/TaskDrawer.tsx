import { useTaskDrawer } from "@/app/hooks/useTaskDrawer";
import { TaskDrawerProps } from "@/app/types";
import { isInvalidTitle } from "@/app/utils";
import { CalendarDays, Clock, X } from "lucide-react";
import { TaskSubtasks } from "./TaskSubtasks";

export function TaskDrawer(props: TaskDrawerProps) {
  const {
    title,
    summary,
    date,
    time,
    important,
    subtasks,
    newSubtask,
    saving,
    isEditing,
    completedSubtasks,
    setSummary,
    setDate,
    setTime,
    setImportant,
    setNewSubtask,
    setTitle,
    handleAddSubtask,
    handleToggleSubtask,
    handleDeleteSubtask,
    handleSubmit,
    handleClose,
  } = useTaskDrawer(props);

  const disabled = saving || isInvalidTitle(title);

  return (
    <div
     
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ${props.isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-full transform border-l border-white/20 bg-neutral-800 transition-transform duration-500 ease-in-out md:w-1/2 ${props.isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-white/20 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-200">
              {isEditing ? "Editar tarea" : "Agregar tarea"}
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              Completa la información de la tarea.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition hover:bg-neutral-600 hover:text-neutral-100"
          >
            <X size={18} />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="custom-scroll h-[calc(100%-73px)] overflow-y-auto px-5 py-5"
        >
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-200">
                Título
                <span className="ml-1 text-orange-400">*</span>
              </span>

              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                autoFocus
                type="text"
                placeholder="Ingrese un título"
                className="h-11 w-full rounded border border-white/20 bg-transparent px-3 text-sm text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:border-white/40"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-200">
                Resumen
              </span>

              <textarea
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                placeholder="Escribe un breve resumen"
                rows={7}
                className="w-full resize-none rounded border border-white/20 bg-transparent px-3 py-3 text-sm text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:border-white/40"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-neutral-200">
                  Fecha
                </span>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    type="date"
                    className="h-11 w-full rounded border border-white/20 bg-transparent pl-10 pr-3 text-sm text-neutral-300 outline-none transition [color-scheme:dark] focus:border-white/40"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-neutral-200">
                  Hora
                </span>

                <div className="relative">
                  <Clock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    type="time"
                    className="h-11 w-full rounded border border-white/20 bg-transparent pl-10 pr-3 text-sm text-neutral-300 outline-none transition [color-scheme:dark] focus:border-white/40"
                  />
                </div>
              </label>

              <section>
                <span className="mb-2 block text-sm font-medium text-neutral-200">
                  Importante
                </span>

                <button
                  onClick={() => setImportant((current) => !current)}
                  type="button"
                  className="flex h-11 w-full cursor-pointer items-center justify-between rounded border border-white/20 px-3 transition hover:border-white/30"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-400">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        important ? "bg-orange-400" : "bg-neutral-600"
                      }`}
                    />

                    {important ? "Importante" : "No importante"}
                  </span>

                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      important ? "bg-orange-500" : "bg-neutral-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                        important ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                </button>
              </section>
            </div>

            <TaskSubtasks
              subtasks={subtasks}
              completedSubtasks={completedSubtasks}
              newSubtask={newSubtask}
              setNewSubtask={setNewSubtask}
              handleAddSubtask={handleAddSubtask}
              handleToggleSubtask={handleToggleSubtask}
              handleDeleteSubtask={handleDeleteSubtask}
            />
          </div>

          <footer className="mt-6 flex justify-end gap-2 border-t border-neutral-700 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded border border-white/20 px-4 py-2 text-xs font-medium text-neutral-400 transition hover:border-white/50 hover:text-neutral-200"
            >
              Cancelar
            </button>

            <button
              disabled={disabled}
              type="submit"
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {saving ? "Guardando..." : isEditing ? "Guardar" : "Crear"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
