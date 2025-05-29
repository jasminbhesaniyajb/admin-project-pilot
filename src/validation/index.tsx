import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please input your email!")
    .email("Please enter a valid email address!"),
  password: z
    .string()
    .min(1, "Please input your password!")
    .min(6, "Password must be at least 6 characters long!"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  password: z
    .string()
    .min(1, "Password must be at least 1 characters")
    .min(6, "Password must be at least 6 characters long!"),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;


export const projectFormSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  referenceNumber: z.string().min(1, "Reference number is required"),
  projectName: z.string().min(1, "Project name is required"),
  projectNumber: z.string().min(1, "Project number is required"),
  areaLocation: z.string().min(1, "Area location is required"),
  address: z.string().min(1, "Address is required"),
  dueDate: z.any().refine((val) => !!val, "Due date is required"),
  contact: z.string().min(1, "Contact is required"),
  manager: z.string().min(1, "Manager is required"),
  staff: z.string().min(1, "Staff is required"),
  status: z.string().min(1, "Status is required"),
  email: z.string().email("Invalid email address"),
});