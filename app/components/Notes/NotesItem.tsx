"use client";

import { Calendar, Download, Eye, EyeOff, Trash2 } from "lucide-react";
import type { NotesItemProps } from "@/app/types";
import { formatDateTime } from "@/app/utils";

export function NotesItem({
  note,
  isUnlocked,
  onToggleUnlock,
  onEdit,
  onDelete,
  onDownload,
}: NotesItemProps) {
  const showBlur = note.isPrivate && !isUnlocked;

  return (
    <div
      onClick={() => {
        if (note.isPrivate && !isUnlocked) return;
        onEdit(note);
      }}
      className="group relative flex h-40 cursor-pointer flex-col justify-between rounded-lg bg-amber-400 p-4 text-neutral-950 shadow-sm transition-colors hover:bg-amber-300"
    >
      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            {note.isPinned && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-neutral-950" />
            )}

            <h3 className="truncate text-sm font-semibold">{note.title}</h3>
          </div>

          {note.isPrivate && (
            <div
              onClick={(e) => onToggleUnlock(note.id, note.isPrivate, e)}
              className="cursor-pointer p-1"
            >
              {showBlur ? (
                <EyeOff className="h-4 w-4 shrink-0 text-neutral-800" />
              ) : (
                <Eye className="h-4 w-4 shrink-0 text-neutral-800" />
              )}
            </div>
          )}
        </div>

        <p
          className={`line-clamp-3 text-xs text-neutral-800 transition-all ${
            showBlur ? "blur-xs select-none" : "blur-none"
          }`}
        >
          {note.summary}
        </p>
      </div>

      <div className="flex items-center gap-1.5 border-t border-neutral-900/10 pt-2 text-[10px] font-medium text-neutral-700">
        <Calendar className="h-3 w-3" />

        <span>{formatDateTime(note.updatedAt)}</span>

        {(!note.isPrivate || isUnlocked) && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(note);
              }}
              className="ml-auto shrink-0 cursor-pointer text-neutral-600"
              title="Descargar Nota"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(note);
              }}
              className="shrink-0 cursor-pointer text-neutral-600 transition-colors hover:text-red-400"
              title="Eliminar Nota"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
