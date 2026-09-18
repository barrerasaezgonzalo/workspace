"use client";

import { useEffect, useState } from "react";
import type { NoteDrawerProps } from "@/app/types";

export function useNoteDrawer({
  isOpen,
  onClose,
  note,
  onSubmit,
}: NoteDrawerProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [privateNote, setPrivateNote] = useState(false);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(note);
  const [suggestedContent, setSuggestedContent] = useState<string | null>(null);
  const [improving, setImproving] = useState(false);

  const handleReset = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setImportant(false);
    setPrivateNote(false);
    setSuggestedContent(null);      
  };

  useEffect(() => {
    if (!isOpen) return;

    if (note) {
      setTitle(note.title);
      setSummary(note.summary ?? "");
      setContent(note.content ?? "");
      setImportant(note.isPinned);
      setPrivateNote(note.isPrivate);
    } else {
      handleReset();
    }
  }, [isOpen, note]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);

      const generatedSummary = await handleGenerateSummary();
      const contentToSave = suggestedContent ?? content;
      await onSubmit({
        title: title.trim(),
        summary: generatedSummary || null,
        content: contentToSave.trim(),
        important,
        private: privateNote,
      });
      handleReset();
      onClose();
    } catch (error) {
      console.error("Error al guardar la nota", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleGenerateSummary = async () => {
    const response = await fetch("/api/notes/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const data = await response.json();

    setSummary(data.summary);

    return data.summary;
  };

  const handleImproveContent = async () => {
    try {
      setImproving(true);
      const response = await fetch("/api/notes/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();
      const improvedContent = data.content?.trim() || null;
      setSuggestedContent(improvedContent);
    } catch (error) {
      console.error("Error al mejorar contenido:", error);
    } finally {
      setImproving(false);
    }
  };

  return {
    title,
    summary,
    content,
    important,
    privateNote,
    saving,
    isEditing,
    setTitle,
    setSummary,
    setContent,
    setImportant,
    setPrivateNote,
    handleSubmit,
    handleClose,
    handleImproveContent,
    suggestedContent,
    setSuggestedContent,
    improving,
  };
}
