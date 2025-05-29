import type { SidebarMenuItem } from "../types";
import {
  DashboardOutlined,
  ProjectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/",
  },
  {
    key: "projects",
    icon: <ProjectOutlined />,
    label: "Projects",
    path: "/projects",
  },
  {
    key: "estimates",
    icon: <FileTextOutlined />,
    label: "Estimates",
    path: "/estimates",
  },
];

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];
