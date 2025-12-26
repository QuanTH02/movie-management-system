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
import Checkbox from "@/app/components/common/Checkbox";
import { useLogin } from "@/app/lib/api/hooks";
import { useToast } from "@/app/components/common/Toast";
import { useI18n } from "@/app/lib/i18n";
import {
  createLoginSchema,
  type LoginFormData,
} from "@/app/lib/validations/auth.schema";

function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const loginSchema = createLoginSchema(t);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { trigger: loginTrigger } = useLogin({
    onSuccess: (data) => {
      if (data?.message === "Successfully logged in.") {
        toast.success(t.login.loginSuccessful);
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error?.message || t.login.loginFailed);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginTrigger({
      username: data.username,
      password: data.password,
    });
    if (result?.message === "Successfully logged in.") {
      if (typeof window !== "undefined") {
        localStorage.setItem("currentAccount", data.username);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center py-12 px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark-text mb-2">
              {t.login.welcomeBack}
            </h1>
            <p className="text-dark-text">{t.login.signInToContinue}</p>
          </div>

          {/* Login Card */}
          <div className="bg-dark-card border border-dark-border rounded-card p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputController
                name="username"
                control={control}
                label={t.login.account}
                type="text"
                placeholder={t.login.enterAccount}
                className="w-full"
              />

              <div>
                <InputController
                  name="password"
                  control={control}
                  label={t.login.password}
                  type={showPassword ? "text" : "password"}
                  placeholder={t.login.enterPassword}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
                      aria-label={
                        showPassword
                          ? t.login.hidePassword
                          : t.login.showPassword
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
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  label={t.login.rememberMe}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mb-0"
                />
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-hover"
                >
                  {t.login.forgotPassword}
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? t.login.signingIn : t.login.signIn}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-card text-dark-text-secondary">
                  {t.login.newToHyfmovie}
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-dark-text-secondary">
                {t.login.dontHaveAccount}{" "}
                <Link
                  href="/register"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-hover"
                >
                  {t.login.signUpNow}
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-dark-text-secondary">
              {t.login.agreeToTerms}{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                {t.login.termsOfService}
              </a>{" "}
              {t.login.and}{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                {t.login.privacyPolicy}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
