export interface Note {
  id: number;
  user_id: string;
  title: string;
  summary: string;
  content?: string;
  updatedAt: string;
  isPinned: boolean;
  isPrivate: boolean;
}

export type NoteFormData = {
  title: string;
  content: string;
  summary: string | null;
  important: boolean;
  private: boolean;
};

export interface NoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onSubmit: (data: {
    title: string;
    summary: string | null;
    content: string;
    important: boolean;
    private: boolean;
  }) => Promise<void>;
}

export type NotesItemProps = {
  note: Note;
  isUnlocked: boolean;
  onToggleUnlock: (id: number, isPrivate: boolean, e: React.MouseEvent) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onDownload: (note: Note) => void;
};

export type NotesGroupProps = {
  notes: Note[];
  unlockedNotes: Record<number, boolean>;
  onToggleUnlock: (id: number, isPrivate: boolean, e: React.MouseEvent) => void;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onDownload: (note: Note) => void;
};

export type NoteHeaderProps = {
  onCreate: () => void;
};
