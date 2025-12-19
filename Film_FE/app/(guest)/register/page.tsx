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
import { useRegister } from "@/app/lib/api/hooks";
import { useToast } from "@/app/components/common/Toast";
import {
  registerSchema,
  type RegisterFormData,
} from "@/app/lib/validations/auth.schema";

function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const { trigger: registerTrigger } = useRegister({
    onSuccess: (data) => {
      toast.success(
        data?.message || "Registration successful! Please sign in to continue.",
      );
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error) => {
      toast.error(error?.message || "Registration failed. Please try again.");
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
              Create Your Account
            </h1>
            <p className="text-dark-text-secondary">
              Join HYFMovie and start exploring
            </p>
          </div>

          {/* Register Card */}
          <div className="bg-dark-card border border-dark-border rounded-card p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Input
                  label="Account"
                  type="text"
                  placeholder="Choose a username"
                  {...register("account")}
                  error={errors.account?.message}
                  helperText="Only letters, numbers, and underscores allowed"
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  error={errors.name?.message}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("gmail")}
                  error={errors.gmail?.message}
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  error={errors.password?.message}
                  helperText="Must be at least 6 characters"
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

              <div>
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirm_password")}
                  error={errors.confirm_password?.message}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
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
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-card text-dark-text-secondary">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-dark-text-secondary">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-hover"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-dark-text-muted">
              By creating an account, you agree to our{" "}
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

export default RegisterPage;
