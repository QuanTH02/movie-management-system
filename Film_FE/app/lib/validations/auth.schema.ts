import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Account is required")
    .min(3, "Account must be at least 3 characters")
    .max(50, "Account must be less than 50 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    account: z
      .string()
      .min(1, "Account is required")
      .min(3, "Account must be at least 3 characters")
      .max(50, "Account must be less than 50 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Account can only contain letters, numbers, and underscores",
      ),
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    gmail: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
