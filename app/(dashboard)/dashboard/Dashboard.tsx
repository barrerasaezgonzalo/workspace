"use client";

import { Tasks } from "@/app/components/Task/Tasks";
import { Calendar } from "@/app/components/Calendar/Calendar";
import { Header } from "@/app/components/Ui/Header";
import { NotesModule } from "@/app/components/Notes/Notes";

export function Dashboard() {
  return (
    <section className="font-mono">
      <Header />
      <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Tasks />
        <div>
          <Calendar />
          <NotesModule />
        </div>
      </div>
    </section>
  );
}
