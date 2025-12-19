import { z } from "zod";
import type { Translations } from "@/app/lib/i18n";

// Helper function to create localized schemas
export function createLoginSchema(t: Translations) {
  return z.object({
    username: z
      .string()
      .min(1, t.validation.accountRequired)
      .min(3, t.validation.accountMinLength)
      .max(50, t.validation.accountMaxLength),
    password: z
      .string()
      .min(1, t.validation.passwordRequired)
      .min(6, t.validation.passwordMinLength),
  });
}

export function createRegisterSchema(t: Translations) {
  return z
    .object({
      account: z
        .string()
        .min(1, t.validation.accountRequired)
        .min(3, t.validation.accountMinLength)
        .max(50, t.validation.accountMaxLength)
        .regex(/^[a-zA-Z0-9_]+$/, t.validation.accountInvalid),
      name: z
        .string()
        .min(1, t.validation.nameRequired)
        .min(2, t.validation.nameMinLength)
        .max(100, t.validation.nameMaxLength),
      gmail: z
        .string()
        .min(1, t.validation.emailRequired)
        .email(t.validation.emailInvalid)
        .max(255, t.validation.emailMaxLength),
      password: z
        .string()
        .min(1, t.validation.passwordRequired)
        .min(6, t.validation.passwordMinLength)
        .max(100, t.validation.passwordMaxLength),
      confirm_password: z.string().min(1, t.validation.confirmPasswordRequired),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t.validation.passwordsDoNotMatch,
      path: ["confirm_password"],
    });
}

// Type exports (inferred from createLoginSchema/createRegisterSchema)
export type LoginFormData = {
  username: string;
  password: string;
};

export type RegisterFormData = {
  account: string;
  name: string;
  gmail: string;
  password: string;
  confirm_password: string;
};
