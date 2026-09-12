"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Calendar, Plus, PocketKnife, Search, Siren, X } from "lucide-react";
import { useState } from "react";
import { Logout } from "./Logout";
import { useTasks } from "@/app/hooks/useTasks";
import { useNotifications } from "@/app/hooks/useNotifications";
import { TaskModal } from "../Task/TaskModal";

export function WorkspaceHeader() {
    const { notifications } = useNotifications();
    const overdueAlert = notifications.find( (alert) => alert.id === "overdue-tasks" );
    const todayEvents = notifications.find( (alert) => alert.id === "today-events" );
    const { handleLogout } = useAuth();
    const [isLogoutOpen, setIsLogoutOpen] =  useState(false);   
    const {
        searchQuery,
        setSearchQuery,
        handleOpenCreate,
        isModalOpen,
        selectedTask,
        handleUpdateTask,
        handleCreateTask,
        setIsModalOpen,
    } = useTasks();

    return (
        <div className="flex items-center border-b border-white/20 py-4">
            <div className="flex items-center gap-2">
                <PocketKnife className="ml-4 h-6 w-6 text-red-400" />

                <h1 className="text-sm text-white">
                    Workspace.
                </h1>
            </div>

            <div className="ml-20 flex h-10 w-sm items-center rounded-sm border border-white/20 bg-neutral-900 text-sm text-neutral-400">
                <Search className="ml-2 h-4 w-4 shrink-0" />

                <input
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.target.value)
                    }
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

            <button
                onClick={handleOpenCreate}
                type="button"
                className="ml-2 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm border border-white/20 bg-neutral-900 px-2 text-sm text-neutral-500 transition hover:border-white/50 hover:text-neutral-400 "  
            >
                <Plus className="h-4 w-4" />
                Nueva tarea
            </button>
            {overdueAlert && (
                <button
                    type="button"
                    className="ml-4 flex items-center gap-2 text-sm text-red-400 transition"
                >
                    <Siren size={25} className="mb-1" />
                    {overdueAlert.title}
                </button>
            )}

            {todayEvents && (
                <button
                    type="button"
                    className="ml-4 flex items-center gap-2 text-sm text-emerald-600 transition "
                >
                    <Calendar size={25} className="mb-1" />
                    {todayEvents.title}
                </button>
            )}

            <div className="ml-auto">
                <Logout
                    setIsLogoutOpen={setIsLogoutOpen}
                    isLogoutOpen={isLogoutOpen}
                    handleLogout={() => {
                        handleLogout();
                        setIsLogoutOpen(false);
                    }}
                />
            </div>

            <TaskModal
                isOpen={isModalOpen}
                task={selectedTask}
                onClose={() => setIsModalOpen(false)}
                onSubmit={
                    selectedTask
                        ? handleUpdateTask
                        : handleCreateTask
                }
            />
        </div>
    );
}