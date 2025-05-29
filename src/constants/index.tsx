import type { SidebarMenuItem } from "../types";
import {
  DashboardOutlined,
  ProjectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const sidebarMenuItems: SidebarMenuItem[] = [
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
