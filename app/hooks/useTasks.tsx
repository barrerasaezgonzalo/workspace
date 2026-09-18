"use client";

import { useContext, useState } from "react";
import { Check, Circle, CircleGauge } from "lucide-react";
import { TaskContext } from "../providers/TaskProvider";
import type { Task, TaskFormData, TaskGroupConfig } from "../types";
import { isDateOverdue, showResponseMessage } from "../utils";
import { DragEndEvent } from "@dnd-kit/core";
import { SearchContext } from "../providers/SearchProvider";

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de TaskProvider");
  }

  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("useTasks debe usarse dentro de SearchProvider");
  }

  const {
    tasks,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
    selectedTask,
    isDrawerOpen,
    isDeleteModalOpen,
    setSelectedTask,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    loadingTasks,
  } = context;

  const [responseOperationMessage, setResponseOperationMessage] = useState("");
  const { searchQuery, setSearchQuery } = searchContext;
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return (
      task.title.toLowerCase().includes(query) ||
      task.summary?.toLowerCase().includes(query)
    );
  });
  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in_progress",
  );
  const doneTasks = filteredTasks.filter((task) => task.status === "done");
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(
    (task) => task.status !== "done" && !!task.date && isDateOverdue(task.date),
  );

  const handleCreateTask = async (data: TaskFormData) => {
    await createTask({
      title: data.title,
      summary: data.summary,
      date: data.date,
      time: data.time,
      important: data.important,
      subtasks: data.subtasks ?? [],
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Tarea creada correctamente.",
    );
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!selectedTask) {
      return;
    }

    await updateTask(selectedTask.id, {
      title: data.title,
      summary: data.summary,
      date: data.date,
      time: data.time,
      important: data.important,
      subtasks: data.subtasks ?? [],
    });

    showResponseMessage(
      setResponseOperationMessage,
      "Tarea actualizada correctamente.",
    );
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) {
      return;
    }
    await deleteTask(selectedTask.id);

    showResponseMessage(
      setResponseOperationMessage,
      "Tarea eliminada correctamente.",
    );

    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setIsDrawerOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = Number(active.id);
    const newStatus = over.id as Task["status"];
    await moveTask(taskId, newStatus);
  };

  const taskGroupConfig: TaskGroupConfig[] = [
    {
      status: "todo",
      title: "Pendientes",
      tasks: todoTasks,
      emptyMessage: "No tienes tareas pendientes.",
      icon: Circle,
      bg: "bg-neutral-500",
      border: "border-neutral-500",
      className: "bg-neutral-400 text-neutral-900",
    },
    {
      status: "in_progress",
      title: "En progreso",
      tasks: inProgressTasks,
      emptyMessage: "No tienes tareas en progreso.",
      icon: CircleGauge,
      bg: "bg-cyan-400",
      border: "border-cyan-400",
      className: "bg-cyan-400 text-neutral-900",
    },
    {
      status: "done",
      title: "Finalizadas",
      tasks: doneTasks,
      emptyMessage: "No tienes tareas finalizadas.",
      icon: Check,
      bg: "bg-green-700",
      border: "border-green-700",
      className: "bg-green-700 text-neutral-200",
    },
  ];

  return {
    tasks,
    totalTasks,
    todoTasks,
    overdueTasks,
    doneTasks,
    taskGroupConfig,
    searchQuery,
    selectedTask,
    responseOperationMessage,
    isDrawerOpen,
    isDeleteModalOpen,
    setSearchQuery,
    setSelectedTask,
    setIsDrawerOpen,
    setIsDeleteModalOpen,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleUpdateTask,
    handleCreateTask,
    handleDeleteTask,
    loadingTasks,
    handleDragEnd,
    filteredTasks
  };
}
