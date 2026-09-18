"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import type { Subtask, Task, TaskFormData } from "@/app/types";
import { supabase } from "../lib/supabaseClient";

type TaskContextType = {
  tasks: Task[];
  loadingTasks: boolean;
  selectedTask: Task | null;
  isDrawerOpen: boolean;
  isDeleteModalOpen: boolean;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  createTask: (task: TaskFormData) => Promise<void>;
  updateTask: (id: number, updates: TaskFormData) => Promise<void>;
  moveTask: (id: number, status: Task["status"]) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  loadTasks: () => Promise<void>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoadingTasks(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select(
          `
          *,
          task_subtasks (
            id,
            title,
            completed,
            position
          )
        `,
        )
        .eq("user_id", user.id)
        .order("date", { ascending: true })
        .order("time", { ascending: true })
        .order("important", { ascending: false });

      if (error) {
        console.error("Error al cargar las tareas", error);
        return;
      }

      const normalizedTasks: Task[] = (data ?? []).map((task) => ({
        ...task,
        createdAt: task.created_at,
        subtasks: [...(task.task_subtasks ?? [])]
          .sort((a, b) => a.position - b.position)
          .map((subtask) => ({
            id: subtask.id,
            title: subtask.title,
            completed: subtask.completed,
          })),
      }));

      setTasks(normalizedTasks);
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const moveTask = async (id: number, status: Task["status"]) => {
     const task = tasks.find((task) => task.id === id);
    if (!task || task.status === status) {
      return;
    }
    const { data: { user }} = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );

    const { error } = await supabase
      .from("tasks")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al mover la tarea", error);
      await loadTasks();
      throw error;
    }
  };

  const createTask = async (task: TaskFormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        title: task.title,
        summary: task.summary || null,
        date: task.date || null,
        time: task.time || null,
        important: task.important,
        status: "todo",
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear la tarea", error);
      throw error;
    }

    let subtasks: Subtask[] = [];

    if (task.subtasks?.length) {
      const { data: createdSubtasks, error: subtasksError } = await supabase
        .from("task_subtasks")
        .insert(
          task.subtasks.map((subtask, index) => ({
            task_id: data.id,
            user_id: user.id,
            title: subtask.title,
            completed: subtask.completed,
            position: index,
          })),
        )
        .select("id, title, completed");

      if (subtasksError) {
        console.error("Error al crear las subtareas", subtasksError);
        throw subtasksError;
      }

      subtasks = createdSubtasks ?? [];
    }

    setTasks((current) => [
      {
        ...data,
        subtasks,
      },
      ...current,
    ]);
  };

  const updateTask = async (id: number, updates: TaskFormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: updates.title,
        summary: updates.summary || null,
        date: updates.date || null,
        time: updates.time || null,
        important: updates.important,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la tarea", error);
      throw error;
    }

    const { error: deleteSubtasksError } = await supabase
      .from("task_subtasks")
      .delete()
      .eq("task_id", id)
      .eq("user_id", user.id);

    if (deleteSubtasksError) {
      console.error("Error al actualizar las subtareas", deleteSubtasksError);

      throw deleteSubtasksError;
    }

    let subtasks: Subtask[] = [];

    if (updates.subtasks?.length) {
      const { data: updatedSubtasks, error: subtasksError } = await supabase
        .from("task_subtasks")
        .insert(
          updates.subtasks.map((subtask, index) => ({
            task_id: id,
            user_id: user.id,
            title: subtask.title,
            completed: subtask.completed,
            position: index,
          })),
        )
        .select("id, title, completed");

      if (subtasksError) {
        console.error("Error al guardar las subtareas", subtasksError);
        throw subtasksError;
      }

      subtasks = updatedSubtasks ?? [];
    }

    const updatedTask: Task = {
      ...data,
      subtasks,
    };

    setTasks((current) =>
      current
        .map((task) => (task.id === id ? updatedTask : task))
        .sort((a, b) => {
          const dateA = a.date ?? "9999-12-31";
          const dateB = b.date ?? "9999-12-31";

          if (dateA !== dateB) {
            return dateA.localeCompare(dateB);
          }

          const timeA = a.time ?? "23:59:59";
          const timeB = b.time ?? "23:59:59";

          if (timeA !== timeB) {
            return timeA.localeCompare(timeB);
          }

          return Number(b.important) - Number(a.important);
        }),
    );
  };

  const deleteTask = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al eliminar la tarea", error);
      throw error;
    }

    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingTasks,
        selectedTask,
        isDrawerOpen,
        isDeleteModalOpen,
        setSelectedTask,
        setIsDrawerOpen,
        setIsDeleteModalOpen,
        createTask,
        updateTask,
        deleteTask,
        loadTasks,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
