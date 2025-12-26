"use client";

import React from "react";
import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      error,
      helperText,
      className,
      indeterminate = false,
      checked,
      disabled,
      ...props
    },
    ref,
  ) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        inputRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
        if (el) {
          el.indeterminate = indeterminate;
        }
      },
      [ref, indeterminate],
    );

    return (
      <div className="w-full">
        <label
          className={clsx(
            "flex items-start gap-2 cursor-pointer",
            {
              "cursor-not-allowed opacity-50": disabled,
              "cursor-pointer": !disabled,
            },
            className,
          )}
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              ref={combinedRef}
              checked={checked}
              disabled={disabled}
              className={clsx(
                "w-4 h-4 rounded border-2",
                "bg-dark-card border-dark-border",
                "text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                "transition-all duration-focus",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                {
                  "border-error-DEFAULT focus:ring-error-DEFAULT": error,
                  "border-primary-600 bg-primary-600":
                    checked && !indeterminate,
                },
              )}
              {...props}
            />
          </div>
          {label && (
            <div className="flex-1">
              <span className="text-sm font-medium text-dark-text">
                {label}
              </span>
              {error && (
                <p className="mt-1 text-sm text-error-DEFAULT font-medium">
                  {error}
                </p>
              )}
              {helperText && !error && (
                <p className="mt-1 text-sm text-dark-text-secondary">
                  {helperText}
                </p>
              )}
            </div>
          )}
        </label>
      </div>
    );
  },
);

export default Checkbox;
export type { CheckboxProps };
