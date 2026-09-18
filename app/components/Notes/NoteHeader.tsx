"use client";

import { NoteHeaderProps } from "@/app/types";
import {
  FileText,
  Plus,
} from "lucide-react";

export function NoteHeader({
  onCreate,
}: NoteHeaderProps) {
  return (
    <div className="mb-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center  w-full  border-b border-white/20 pb-2">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-amber-400" />

        <h2 className="text-lg font-semibold text-neutral-200 ">Notas</h2>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">

        <button
          type="button"
          onClick={onCreate}
          className="flex h-8 w-8 cursor-pointer rounded-lg border border-white/20 p-2 text-neutral-400 transition-colors hover:border-amber-400 hover:text-amber-400"
          title="Nueva nota"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
