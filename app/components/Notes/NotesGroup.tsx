"use client";

import type { NotesGroupProps } from "@/app/types";
import { NotesItem } from "./NotesItem";

export function NotesGroup({
  notes,
  unlockedNotes,
  onToggleUnlock,
  onEdit,
  onDelete,
  onDownload,
}: NotesGroupProps) {
  return (
    <>
      {notes.length === 0 ? (
        <div className="flex min-h-12 items-center justify-center rounded-lg border border-dashed border-neutral-700">
          <p className="text-center text-sm text-neutral-500">
            No se encontraron notas
          </p>
        </div>
      ) : (
        <div
          className="h-[400px] custom-scroll overflow-x-hidden overflow-y-auto pr-4">
          <div className="grid h-full grid-cols-2 gap-4 py-2">
            {notes.map((note) => (
              <NotesItem
                key={note.id}
                note={note}
                isUnlocked={unlockedNotes[note.id]}
                onToggleUnlock={onToggleUnlock}
                onEdit={onEdit}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
