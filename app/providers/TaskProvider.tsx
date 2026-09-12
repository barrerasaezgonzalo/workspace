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

import type { Task } from "@/app/types";
import { supabase } from "../lib/supabaseClient";

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  searchQuery: string;
  selectedTask: Task | null;
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  createTask: (task: Omit<Task, "id" | "user_id">) => Promise<void>;
  updateTask: (
    id: number,
    updates: Partial<Omit<Task, "id" | "user_id">>,
  ) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  loadTasks: () => Promise<void>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setTasks([]);
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("important", { ascending: false })
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error al cargar las tareas", error);
        return;
      }

      setTasks(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (
    task: Omit<Task, "id" | "user_id">,
  ) => {
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
        important: task.important,
        status: task.status,
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear la tarea", error);
      throw error;
    }

    setTasks((current) => [data, ...current]);
  };

  const updateTask = async (
    id: number,
    updates: Partial<Omit<Task, "id" | "user_id">>,
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({
        ...updates,
        summary: updates.summary || null,
        date: updates.date || null,
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

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? data : task,
      ),
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

    setTasks((current) =>
      current.filter((task) => task.id !== id),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        searchQuery,
        selectedTask,
        isModalOpen,
        isDeleteModalOpen,
        setSearchQuery,
        setSelectedTask,
        setIsModalOpen,
        setIsDeleteModalOpen,
        createTask,
        updateTask,
        deleteTask,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}