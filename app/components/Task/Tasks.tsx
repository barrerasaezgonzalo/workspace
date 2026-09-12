"use client";

import { useTasks } from "@/app/hooks/useTasks";
import { TaskGroup } from "./TaskGroup";
import { TaskModal } from "./TaskModal";
import { ConfirmModal } from "../Ui/ConfirmModal";
import { Toast } from "../Ui/Toast";

export function Tasks() {
  const {
    taskGroupConfig,
    responseOperationMessage,
    handleOpenEdit,
    handleOpenDelete,
    isModalOpen,
    setIsModalOpen,
    selectedTask,
    handleUpdateTask,
    handleCreateTask,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeleteTask,
  } = useTasks();
  
  return (
    <section className="w-full font-mono pt-4">

      <TaskGroup
        taskGroupConfig={taskGroupConfig}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => setIsModalOpen(false)}
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
    </section >
  );
}
