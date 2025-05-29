export interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export interface SidebarMenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}