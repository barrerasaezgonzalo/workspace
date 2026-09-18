"use client";

import { useEffect, useState } from "react";
import type { Subtask, TaskDrawerProps } from "@/app/types";

export function useTaskDrawer({
  isOpen,
  onClose,
  task,
  onSubmit,
}: TaskDrawerProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [important, setImportant] = useState(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(task);

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed,
  ).length;

  const handleReset = () => {
    setTitle("");
    setSummary("");
    setDate("");
    setTime("");
    setImportant(false);
    setSubtasks([]);
    setNewSubtask("");
  };

  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setTitle(task.title);
      setSummary(task.summary ?? "");
      setDate(task.date ?? "");
      setTime(task.time ?? "");
      setImportant(task.important);
      setSubtasks(task.subtasks ?? []);
    } else {
      handleReset();
    }
  }, [isOpen, task]);

  const handleAddSubtask = () => {
    const value = newSubtask.trim();

    if (!value) return;

    setSubtasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: value,
        completed: false,
      },
    ]);

    setNewSubtask("");
  };

  const handleToggleSubtask = (id: number) => {
    setSubtasks((current) =>
      current.map((subtask) =>
        subtask.id === id
          ? {
              ...subtask,
              completed: !subtask.completed,
            }
          : subtask,
      ),
    );
  };

  const handleDeleteSubtask = (id: number) => {
    setSubtasks((current) => current.filter((subtask) => subtask.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length < 5) return;

    try {
      setSaving(true);

      await onSubmit({
        title: title.trim(),
        summary: summary.trim(),
        date,
        time,
        important,
        subtasks,
      });

      handleReset();
      onClose();
    } catch (error) {
      console.error("Error al guardar la tarea", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return {
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
  };
}
