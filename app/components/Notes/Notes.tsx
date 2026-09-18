"use client";

import { useState } from "react";
import { NoteDrawer } from "./NoteDrawer";
import { useNotes } from "@/app/hooks/useNotes";
import { NotesGroup } from "./NotesGroup";
import { NoteHeader } from "./NoteHeader";
import { ConfirmModal } from "../Ui/ConfirmModal";

export function NotesModule() {
  const {
    filteredNotes,
    selectedNote,
    isDrawerOpen,
    setIsDrawerOpen,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleDownloadNote,
    handleCreateNote,
    handleUpdateNote,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteNote,
  } = useNotes();

  const [unlockedNotes, setUnlockedNotes] = useState<Record<number, boolean>>(
    {},
  );
  const toggleUnlock = (
    id: number,
    isPrivate: boolean,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (!isPrivate) return;
    setUnlockedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="text-neutral-400 mt-8">
      <NoteHeader onCreate={handleOpenCreate} />

      <NotesGroup
        notes={filteredNotes}
        unlockedNotes={unlockedNotes}
        onToggleUnlock={toggleUnlock}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        onDownload={handleDownloadNote}
      />

      <NoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        note={selectedNote}
        onSubmit={selectedNote ? handleUpdateNote : handleCreateNote}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar Nota"
        description="¿Estás seguro de que deseas eliminar esta nota?"
        variant="warning"
        onConfirm={handleDeleteNote}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
