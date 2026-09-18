"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { PocketKnife, Search, X } from "lucide-react";
import { useState } from "react";
import { Logout } from "./Logout";
import { useTasks } from "@/app/hooks/useTasks";
import { getFormattedToday } from "@/app/utils";

export function Header() {
  const formatedDate = getFormattedToday();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { handleLogout } = useAuth();
  const { searchQuery, setSearchQuery } = useTasks();

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
        <div className="flex mr-4">
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
