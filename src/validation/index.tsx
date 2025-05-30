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

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Enter a valid email"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})


export const estimateItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  // description: z.string().min(1, "Description is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z
    .string({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1"),
  price: z
    .string({ required_error: "Price is required" })
    .min(0, "Price must be at least 0"),
  margin: z
    .string({ required_error: "Margin is required" })
    .min(0, "Margin must be at least 0"),
});

export const sectionSchema = z.object({
  sectionTitle: z.string().min(1, "Section title is required"),
  items: z.array(estimateItemSchema).min(1, "At least one item is required"),
});

export const estimateFormSchema = z.object({
  sections: z.array(sectionSchema).min(1, "At least one section is required"),
});

export type EstimateFormSchema = z.infer<typeof estimateFormSchema>;