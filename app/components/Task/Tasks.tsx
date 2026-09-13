"use client";

import { useTasks } from "@/app/hooks/useTasks";
import { TaskGroup } from "./TaskGroup";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { Toast } from "../Ui/Toast";
import { TaskDrawer } from "./TaskDrawer";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/app/types";

export function Tasks() {
  const {
    taskGroupConfig,
    responseOperationMessage,
    handleOpenEdit,
    handleOpenDelete,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedTask,
    handleUpdateTask,
    handleCreateTask,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteTask,
    moveTask,
  } = useTasks();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = Number(active.id);
    const newStatus = over.id as Task["status"];
    await moveTask(taskId, newStatus);
  };

  return (
    <section className="w-full pt-4">
      <DndContext onDragEnd={handleDragEnd}>
        <TaskGroup
          taskGroupConfig={taskGroupConfig}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </DndContext>

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={selectedTask}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Eliminar tarea"
        description="¿Estás seguro de que deseas eliminar esta tarea?"
        variant="warning"
        onConfirm={handleDeleteTask}
        onClose={() => setIsDeleteModalOpen(false)}
      />

      <Toast message={responseOperationMessage} />
    </section>
  );
}
