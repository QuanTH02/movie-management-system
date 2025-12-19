"use client";

import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightIcon?: ReactNode;
}

function Input({
  label,
  error,
  helperText,
  className,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={clsx(
            "w-full px-4 py-2 rounded-input",
            "bg-dark-card border border-dark-border",
            "text-dark-text placeholder-dark-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-focus",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            {
              "border-error-DEFAULT focus:ring-error-DEFAULT": error,
              "pr-10": rightIcon,
            },
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error-DEFAULT">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-dark-text-muted">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
export type { InputProps };
