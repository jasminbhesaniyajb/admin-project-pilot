import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Please input your email!')
    .email('Please enter a valid email address!'),
  password: z
    .string()
    .min(1, 'Please input your password!')
    .min(6, 'Password must be at least 6 characters long!'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
