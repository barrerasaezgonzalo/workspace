import { LogoutProps } from "@/app/types";
import { ConfirmModal } from "./ConfirmModal";
import { LogOut } from "lucide-react";

export function Logout({
  setIsLogoutOpen,
  isLogoutOpen,
  handleLogout,
}: LogoutProps) {
  return (
    <>
      <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="flex justify-center h-10 w-10 mx-4 cursor-pointer border border-red-400 bg-transparent items-center gap-2 rounded-sm
            text-red-300 hover:border-red-500 hover:text-red-400" >
          <LogOut className="h-4 w-4" />
        </button>

      <ConfirmModal
        isOpen={isLogoutOpen}
        variant="warning"
        title="Cerrar sesión"
        description="¿Estás seguro de que quieres cerrar tu sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}