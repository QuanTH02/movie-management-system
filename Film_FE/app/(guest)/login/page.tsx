"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/app/components/common/Navbar";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { useLogin } from "@/app/lib/api/hooks";
import { useToast } from "@/app/components/common/Toast";
import {
  loginSchema,
  type LoginFormData,
} from "@/app/lib/validations/auth.schema";

function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { trigger: loginTrigger } = useLogin({
    onSuccess: (data) => {
      if (data?.message === "Successfully logged in.") {
        const username = (
          document.querySelector('input[name="username"]') as HTMLInputElement
        )?.value;
        if (typeof window !== "undefined" && username) {
          localStorage.setItem("currentAccount", username);
        }
        toast.success("Login successful! Welcome back.");
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(
        error?.message ||
          "Login failed. Please check your credentials and try again.",
      );
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginTrigger({ username: data.username, password: data.password });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center py-12 px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark-text mb-2">
              Welcome Back
            </h1>
            <p className="text-dark-text-secondary">
              Sign in to continue to your account
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-dark-card border border-dark-border rounded-card p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Account"
                  type="text"
                  placeholder="Enter your account"
                  {...register("username")}
                  error={errors.username?.message}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  error={errors.password?.message}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-dark-border bg-dark-surface text-primary-600 focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="text-sm text-dark-text-secondary">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-hover"
                >
                  Forgot password?
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-card text-dark-text-secondary">
                  New to HYFMovie?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-dark-text-secondary">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-hover"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-dark-text-muted">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
