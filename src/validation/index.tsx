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
