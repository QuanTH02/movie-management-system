"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/app/components/common/Navbar";
import Input, { InputController } from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { useRegister } from "@/app/lib/api/hooks";
import { useToast } from "@/app/components/common/Toast";
import { useI18n } from "@/app/lib/i18n";
import {
  createRegisterSchema,
  type RegisterFormData,
} from "@/app/lib/validations/auth.schema";

function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerSchema = createRegisterSchema(t);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      account: "",
      name: "",
      gmail: "",
      password: "",
      confirm_password: "",
    },
  });

  const { trigger: registerTrigger } = useRegister({
    onSuccess: (data) => {
      toast.success(data?.message || t.register.registrationSuccessful);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error?.message || t.register.registrationFailed);
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerTrigger({
      account: data.account,
      name: data.name,
      gmail: data.gmail,
      password: data.password,
      confirm_password: data.confirm_password,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center py-12 px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark-text mb-2">
              {t.register.createAccount}
            </h1>
            <p className="text-dark-text">{t.register.joinHyfmovie}</p>
          </div>

          {/* Register Card */}
          <div className="bg-dark-card border border-dark-border rounded-card p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputController
                name="account"
                control={control}
                label={t.register.account}
                type="text"
                placeholder={t.register.chooseUsername}
                helperText={t.register.accountHelper}
                className="w-full"
              />

              <InputController
                name="name"
                control={control}
                label={t.register.fullName}
                type="text"
                placeholder={t.register.enterFullName}
                className="w-full"
              />

              <InputController
                name="gmail"
                control={control}
                label={t.register.email}
                type="email"
                placeholder={t.register.enterEmail}
                className="w-full"
              />

              <InputController
                name="password"
                control={control}
                label={t.register.password}
                type={showPassword ? "text" : "password"}
                placeholder={t.register.createPassword}
                helperText={t.register.passwordHelper}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
                    aria-label={
                      showPassword
                        ? t.register.hidePassword
                        : t.register.showPassword
                    }
                  >
                    <i
                      className={clsx("fas", {
                        "fa-eye": showPassword,
                        "fa-eye-slash": !showPassword,
                      })}
                    />
                  </button>
                }
                className="w-full"
              />

              <InputController
                name="confirm_password"
                control={control}
                label={t.register.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t.register.confirmPasswordPlaceholder}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
                    aria-label={
                      showConfirmPassword
                        ? t.register.hidePassword
                        : t.register.showPassword
                    }
                  >
                    <i
                      className={clsx("fas", {
                        "fa-eye": showConfirmPassword,
                        "fa-eye-slash": !showConfirmPassword,
                      })}
                    />
                  </button>
                }
                className="w-full"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="mt-6"
              >
                {isSubmitting
                  ? t.register.creatingAccount
                  : t.register.createAccountButton}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-card text-dark-text-secondary">
                  {t.register.alreadyHaveAccount}
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-dark-text-secondary">
                {t.register.alreadyRegistered}{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-hover"
                >
                  {t.register.signInHere}
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-dark-text-secondary">
              {t.register.agreeToTerms}{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                {t.register.termsOfService}
              </a>{" "}
              {t.register.and}{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                {t.register.privacyPolicy}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
