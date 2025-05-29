import type { Customer, Manager, SidebarMenuItem, Staff } from "../types";
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

export const CUSTOMERS: Customer[] = [
  { id: "1", name: "ABC Corporation" },
  { id: "2", name: "XYZ Industries" },
  { id: "3", name: "Tech Solutions Ltd" },
];

export const MANAGERS: Manager[] = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Mike Wilson" },
];

export const STAFF: Staff[] = [
  { id: "1", name: "Alice Brown" },
  { id: "2", name: "Bob Davis" },
  { id: "3", name: "Carol White" },
];

export const STATUS = [
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In Progress" },
  { value: "on-hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];
