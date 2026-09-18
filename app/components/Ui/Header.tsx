"use client";

import { useAuth } from "@/app/hooks/useAuth";
import {
  CalendarDays,
  Plus,
  PocketKnife,
  Search,
  Siren,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logout } from "./Logout";
import { useTasks } from "@/app/hooks/useTasks";
import { useNotifications } from "@/app/hooks/useNotifications";
import { getFormattedToday } from "@/app/utils";

export function Header() {
  const { notifications } = useNotifications();
  const formatedDate = getFormattedToday();
  const overdueAlert = notifications.find(
    (alert) => alert.id === "overdue-tasks",
  );
  const todayEvents = notifications.find(
    (alert) => alert.id === "today-events",
  );
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { handleLogout } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    handleOpenCreate,
    totalTasks,
    doneTasks,
  } = useTasks();

  return (
    <>
      <div className="flex items-center border-b border-white/20 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <PocketKnife className="ml-4 h-6 w-6 text-red-400" />
            <h1 className="text-sm text-white">Workspace.</h1>
          </div>
          <div className="hidden lg:flex ml-4 pt-1 text-neutral-400 text-xs first-letter:uppercase">
            {formatedDate}
          </div>
        </div>

        <div className="hidden mx-auto md:flex h-10 w-xs 2xl:w-lg items-center rounded-sm border border-white/20 bg-neutral-900 text-sm text-neutral-400">
          <Search className="ml-2 h-4 w-4 shrink-0" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full px-2 py-1 outline-none"
            placeholder="Buscar tarea..."
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mr-2 cursor-pointer text-neutral-500 transition hover:text-neutral-200"
              title="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <div className="hidden xl:flex items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-300">
            <span className="font-medium">
              {doneTasks.length}/{totalTasks}
            </span>
            <strong className="text-neutral-500">finalizadas</strong>
            <span className="text-neutral-600">•</span>
            <span className="text-emerald-400">
              {Math.round((doneTasks.length / totalTasks) * 100)}%
            </span>
          </div>

          {overdueAlert && (
            <div className="ml-4 hidden xl:flex items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <Siren size={16} className="text-red-400" />
              <span>
                <strong className="text-neutral-500">
                  {overdueAlert.title}
                </strong>
              </span>
            </div>
          )}

          {todayEvents && (
            <div className="ml-4 hidden xl:flex items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <CalendarDays size={16} className="text-cyan-400" />
              <span>
                <strong className="text-neutral-500">
                  {todayEvents.title}
                </strong>
              </span>
            </div>
          )}

          <button
            onClick={handleOpenCreate}
            type="button"
            className="ml-4 -mr-4 md:mr-0 flex items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm cursor-pointer text-neutral-300 hover:border-white/50 hover:text-neutral-100"
          >
            <Plus size={16} />
            <span className="hidden lg:flex"> Nueva tarea </span>
          </button>

          <Logout
            setIsLogoutOpen={setIsLogoutOpen}
            isLogoutOpen={isLogoutOpen}
            handleLogout={() => {
              handleLogout();
              setIsLogoutOpen(false);
            }}
          />
        </div>
      </div>

      <div className="md:hidden flex h-10 mt-4 w-auto mx-4 items-center rounded-sm border border-white/20 bg-neutral-900 text-sm text-neutral-400">
        <Search className="ml-2 h-4 w-4 shrink-0" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full px-2 py-1 outline-none"
          placeholder="Buscar tarea..."
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mr-2 cursor-pointer text-neutral-500 transition hover:text-neutral-200"
            title="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
}
