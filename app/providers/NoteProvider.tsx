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

import type { Note, NoteFormData } from "@/app/types";
import { supabase } from "../lib/supabaseClient";

type NoteContextType = {
  notes: Note[];
  loadingNotes: boolean;
  selectedNote: Note | null;
  isDrawerOpen: boolean;
  isDeleteModalOpen: boolean;
  setSelectedNote: Dispatch<SetStateAction<Note | null>>;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  createNote: (note: NoteFormData) => Promise<void>;
  updateNote: (id: number, updates: NoteFormData) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  loadNotes: () => Promise<void>;
};

export const NoteContext = createContext<NoteContextType | null>(null);

type NoteProviderProps = {
  children: ReactNode;
};

export function NoteProvider({ children }: NoteProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadNotes = useCallback(async () => {
    try {
      setLoadingNotes(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setNotes([]);
        return;
      }

      const { data, error } = await supabase
        .from("ws_notes")
        .select("*")
        .eq("user_id", user.id)
        .is("deleted_at", null)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error al cargar las notas", error);
        return;
      }

      const normalizedNotes: Note[] = (data ?? []).map((note) => ({
        id: note.id,
        user_id: note.user_id,
        title: note.title,
        summary: note.summary,
        content: note.content,
        updatedAt: note.updated_at,
        isPinned: note.important,
        isPrivate: note.private,
      }));

      setNotes(normalizedNotes);
    } finally {
      setLoadingNotes(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const createNote = async (note: NoteFormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("ws_notes")
      .insert({
        user_id: user.id,
        title: note.title,
        summary: note.summary || null,
        content: note.content || null,
        important: note.important,
        private: note.private,
      })
      .select()
      .single();

    if (error) {
      console.error("Error al crear la nota", error);
      throw error;
    }

    const newNote: Note = {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      updatedAt: data.updated_at,
      isPinned: data.important,
      isPrivate: data.private,
    };

    setNotes((current) => [newNote, ...current]);
  };

  const updateNote = async (id: number, updates: NoteFormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { data, error } = await supabase
      .from("ws_notes")
      .update({
        title: updates.title,
        summary: updates.summary,
        content: updates.content || null,
        important: updates.important,
        private: updates.private,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la nota", error);
      throw error;
    }

    const updatedNote: Note = {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      updatedAt: data.updated_at,
      isPinned: data.important,
      isPrivate: data.private,
    };

    setNotes((current) =>
      current.map((note) => (note.id === id ? updatedNote : note)),
    );
  };

  const deleteNote = async (id: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No autorizado");
    }

    const { error } = await supabase
      .from("ws_notes")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error al eliminar la nota", error);
      throw error;
    }

    setNotes((current) => current.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadingNotes,
        selectedNote,
        isDrawerOpen,
        isDeleteModalOpen,
        setSelectedNote,
        setIsDrawerOpen,
        setIsDeleteModalOpen,
        createNote,
        updateNote,
        deleteNote,
        loadNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
