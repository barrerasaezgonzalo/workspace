"use client";

import { Tasks } from "@/app/components/Task/Tasks";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Header } from "@/app/components/Ui/Header";
import { useTasks } from "@/app/hooks/useTasks";

export function Dashboard() {
  const { handleOpenEdit } = useTasks();

  return (
    <section className="font-mono">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Tasks />
        <Calendar onEdit={handleOpenEdit} />
      </div>
    </section>
  );
}
