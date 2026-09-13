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
        className="flex mr-2 ml-8 cursor-pointer items-center text-red-400 hover:text-red-500"
      >
        <LogOut size={25} />
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
