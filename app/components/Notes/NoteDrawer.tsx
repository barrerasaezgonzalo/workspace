"use client";

import { Sparkle, X } from "lucide-react";
import type { NoteDrawerProps } from "@/app/types";
import { useNoteDrawer } from "@/app/hooks/useNoteDrawer";
import { isInvalidTitle } from "@/app/utils";

export function NoteDrawer({ isOpen, onClose, note, onSubmit }: NoteDrawerProps) {
  const {
    title,
    setTitle,
    summary,
    content,
    important,
    privateNote,
    saving,
    isEditing,
    setContent,
    setImportant,
    setPrivateNote,
    handleSubmit,
    handleClose,
    improving,
    handleImproveContent,
    suggestedContent,
    setSuggestedContent,
  } = useNoteDrawer({
    isOpen,
    onClose,
    note,
    onSubmit,
  });

  const disabled = saving || isInvalidTitle(title);
  const displayedContent = suggestedContent ? (suggestedContent ?? content) : content;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ${
        isOpen  ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0" }`} >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`absolute right-0 top-0 h-full w-full transform border-l border-white/20 bg-neutral-800 transition-transform duration-500 ease-in-out md:w-1/2 ${
          isOpen ? "translate-x-0" : "translate-x-full" }`} >
        <header className="flex items-center justify-between border-b border-white/20 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-200">
              {isEditing ? "Editar Nota" : "Agregar Nota"}
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Completa la información de la nota.
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

            <section>
              <span className="mb-2 block text-sm font-medium text-neutral-200">
                Resumen (Generado por AI)
              </span>

              <div className="w-full rounded border border-white/20 bg-neutral-900/30 px-3 py-3 text-sm leading-relaxed text-neutral-400">
                {summary || (
                  <span className="text-neutral-600">
                    El resumen será generado por AI.
                  </span>
                )}
              </div>
            </section>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-200">
                Contenido
              </span>

              <textarea
                value={displayedContent}
                onChange={(e) =>
                  suggestedContent
                    ? setSuggestedContent(e.target.value)
                    : setContent(e.target.value)
                }
                placeholder="Escribe el contenido de tu nota"
                rows={7}
                className="w-full resize-none rounded border border-white/20 bg-transparent px-3 py-3 text-sm text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:border-white/40"
              />
            </label>

            <div className="flex items-center justify-between gap-4">
              <section className="w-full">
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

              <section className="w-full">
                <span className="mb-2 block text-sm font-medium text-neutral-200">
                  Privada
                </span>

                <button
                  onClick={() => setPrivateNote((current) => !current)}
                  type="button"
                  className="flex h-11 w-full cursor-pointer items-center justify-between rounded border border-white/20 px-3 transition hover:border-white/30"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-400">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        privateNote ? "bg-orange-400" : "bg-neutral-600"
                      }`}
                    />

                    {privateNote ? "Privada" : "No privada"}
                  </span>

                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      privateNote ? "bg-orange-500" : "bg-neutral-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                        privateNote ? "left-6" : "left-1"
                      }`}
                    />
                  </span>
                </button>
              </section>
            </div>

            {!disabled && displayedContent.length > 5 && (
              <section className="mb-2 flex flex-row gap-4   pt-4">
                <p className="flex items-center gap-2">
                  <span className="text-sm text-neutral-300">
                    ¿Deseas mejorar esta nota con AI?
                  </span>

                  <Sparkle size={20} className="text-amber-600" />
                </p>

                <button
                  type="button"
                  onClick={handleImproveContent}
                  disabled={improving}
                  className="ml-auto cursor-pointer rounded border border-white/25 px-2 py-1 text-sm text-neutral-300 transition hover:border-white/40 hover:text-neutral-200"
                >
                  {improving ? "Mejorando..." : "Mejorar"}
                </button>

                {suggestedContent && (
                  <button
                    type="button"
                    onClick={() => setSuggestedContent(null)}
                    className="cursor-pointer rounded border border-white/15 px-2 py-1 text-sm text-neutral-400 transition hover:border-white/40 hover:text-neutral-200"
                  >
                    Volver al original
                  </button>
                )}
              </section>
            )}

            <p className="text-xs text-neutral-400">
              Puedes volver a tu nota original o generar una nueva versión
              cuantas veces quieras.
            </p>           
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
