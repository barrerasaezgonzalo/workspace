import type { LucideIcon } from "lucide-react";

type ConfirmModalVariant = "info" | "warning";

export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  variant?: ConfirmModalVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  showCancel?: boolean;
};

type ToastVariant = "success" | "error";

export type ToastProps = {
  message: string;
  variant?: ToastVariant;
  icon?: LucideIcon;
};


export type LogoutProps = {
  setIsLogoutOpen: (value: boolean) => void;
  isLogoutOpen: boolean;
  handleLogout: () => void;
};


export type DashboardLayoutProps = {
  children: React.ReactNode;
};
