"use client";

import { useContext, useState } from "react";
import { NoteContext } from "../providers/NoteProvider";
import type { Note, NoteFormData } from "../types";
import { formatDateTime, showResponseMessage } from "../utils";
import { SearchContext } from "../providers/SearchProvider";

export function useNotes() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNotes debe usarse dentro de NoteProvider");
  }

  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("useNotes debe usarse dentro de SearchProvider");
  }

  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
    selectedNote,
    isDrawerOpen,
    isDeleteModalOpen,
    setSelectedNote,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    loadingNotes,
  } = context;

  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const { searchQuery, setSearchQuery } = searchContext;
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      note.title.toLowerCase().includes(query) ||
      note.summary?.toLowerCase().includes(query)
    );
  });

  const handleCreateNote = async (data: NoteFormData) => {
    await createNote({
      title: data.title,
      summary: data.summary,
      content: data.content,
      important: data.important,
      private: data.private,
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Nota creada correctamente.",
    );
  };

  const handleUpdateNote = async (data: NoteFormData) => {
    if (!selectedNote) {
      return;
    }

    await updateNote(selectedNote.id, {
      title: data.title,
      content: data.content,
      summary: data.summary,
      important: data.important,
      private: data.private,
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Nota actualizada correctamente.",
    );
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) {
      return;
    }

    await deleteNote(selectedNote.id);

    showResponseMessage(
      setResponseOperationMessage,
      "Nota eliminada correctamente.",
    );

    setIsDeleteModalOpen(false);
    setSelectedNote(null);
  };

  const handleOpenEdit = (note: Note) => {
    setSelectedNote(note);
    setIsDrawerOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedNote(null);
    setIsDrawerOpen(true);
  };

  const handleOpenDelete = (note: Note) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const handleDownloadNote = (note: Note) => {
    const fileName = (note.title.trim() || "nota")
      .replace(/[<>:"/\\|?*]/g, "-")
      .slice(0, 100);
    const fileContent = [
      note.title,
      `Actualizada: ${formatDateTime(note.updatedAt)}`,
      "",
      "Resumen",
      note.summary ?? "",
      "",
      "Contenido",
      note.content ?? "",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([fileContent], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    notes,
    filteredNotes,
    searchQuery,
    selectedNote,
    responseOperationMessage,
    isDrawerOpen,
    isDeleteModalOpen,
    setSearchQuery,
    setSelectedNote,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleDownloadNote,
    handleUpdateNote,
    handleCreateNote,
    handleDeleteNote,
    loadingNotes,
  };
}
