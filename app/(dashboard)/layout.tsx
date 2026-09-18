"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { ScrollToTop } from "../components/Ui/scrollToTop";
import { DashboardSkeleton } from "../components/Ui/DashboardSkeleton";
import { DashboardLayoutProps } from "../types";
import { useTasks } from "../hooks/useTasks";
import { useNotes } from "../hooks/useNotes";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { loading } = useAuth();
  const { loadingTasks } = useTasks();
  const { loadingNotes } = useNotes();

  if (loading || loadingTasks || loadingNotes) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen bg-neutral-800">
        <main className="min-w-0 w-full">
          <section>{children}</section>
        </main>
      </div>
      <ScrollToTop />
    </div>
  );
}
