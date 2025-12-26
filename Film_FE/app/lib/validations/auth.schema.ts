import { z } from "zod";
import type { Translations } from "@/app/lib/i18n";
import {
  ACCOUNT_MIN_LENGTH,
  ACCOUNT_MAX_LENGTH,
  ACCOUNT_REGEX,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/app/lib/constants/validation";

// Helper function to create localized schemas
export function createLoginSchema(t: Translations) {
  return z.object({
    username: z
      .string()
      .min(1, t.validation.accountRequired)
      .min(ACCOUNT_MIN_LENGTH, t.validation.accountMinLength)
      .max(ACCOUNT_MAX_LENGTH, t.validation.accountMaxLength),
    password: z
      .string()
      .min(1, t.validation.passwordRequired)
      .min(PASSWORD_MIN_LENGTH, t.validation.passwordMinLength),
  });
}

export function createRegisterSchema(t: Translations) {
  return z
    .object({
      account: z
        .string()
        .min(1, t.validation.accountRequired)
        .min(ACCOUNT_MIN_LENGTH, t.validation.accountMinLength)
        .max(ACCOUNT_MAX_LENGTH, t.validation.accountMaxLength)
        .regex(ACCOUNT_REGEX, t.validation.accountInvalid),
      name: z
        .string()
        .min(1, t.validation.nameRequired)
        .min(NAME_MIN_LENGTH, t.validation.nameMinLength)
        .max(NAME_MAX_LENGTH, t.validation.nameMaxLength),
      gmail: z
        .string()
        .min(1, t.validation.emailRequired)
        .email(t.validation.emailInvalid)
        .max(EMAIL_MAX_LENGTH, t.validation.emailMaxLength),
      password: z
        .string()
        .min(1, t.validation.passwordRequired)
        .min(PASSWORD_MIN_LENGTH, t.validation.passwordMinLength)
        .max(PASSWORD_MAX_LENGTH, t.validation.passwordMaxLength),
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
