"use client";

import { NoteHeaderProps } from "@/app/types";
import { FileText, Plus } from "lucide-react";

export function NoteHeader({ onCreate }: NoteHeaderProps) {
  return (
    <div className="mb-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center w-full">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-amber-400" />

        <h2 className="text-lg font-semibold text-neutral-200 ">Notas</h2>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center bg-neutral-900 cursor-pointer rounded-lg border border-white/20 p-2 text-xs font-medium text-neutral-400 transition-colors hover:border-white/50 hover:text-neutral-300 gap-1 mr-4"
          title="Nueva nota"
        >
          <Plus size={16} /> Crear
        </button>
      </div>
    </div>
  );
}
