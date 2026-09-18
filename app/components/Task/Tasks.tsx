"use client";

import { useTasks } from "@/app/hooks/useTasks";
import { TaskGroup } from "./TaskGroup";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { Toast } from "../Ui/Toast";
import { TaskDrawer } from "./TaskDrawer";
import { DndContext } from "@dnd-kit/core";

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
    handleDragEnd,
  } = useTasks();

  return (
    <section className="relative pt-2 ">
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
