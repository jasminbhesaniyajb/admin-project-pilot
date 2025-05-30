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

export interface ProjectData {
  id?: string;
  customer: string;
  referenceNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  dueDate?: string;
  contact: string;
  manager: string;
  staff: string;
  status: string;
  email: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Manager {
  id: string;
  name: string;
}

export interface Staff {
  id: string;
  name: string;
}

export interface EstimateItem {
  title: string;
  description?: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
}

export interface EstimateSection {
  name: string;
  items: EstimateItem[];
}

export interface EstimateFormValues {
  sections: EstimateSection[];
}
