"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import type { SelectHTMLAttributes, ReactNode } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  rightIcon?: ReactNode;
}

function Select({
  label,
  error,
  helperText,
  className,
  options,
  placeholder = "Select an option",
  rightIcon,
  disabled,
  value,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      setSelectedLabel(option?.label || "");
    } else {
      setSelectedLabel("");
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string | number) => {
    if (props.onChange) {
      const event = {
        target: { value: String(optionValue) },
      } as React.ChangeEvent<HTMLSelectElement>;
      props.onChange(event);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-1.5">
          {label}
        </label>
      )}
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            "w-full px-4 py-2 rounded-input",
            "bg-dark-card border border-dark-border",
            "text-dark-text",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-focus",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-between",
            {
              "border-error-DEFAULT focus:ring-error-DEFAULT": error,
            },
            className,
          )}
        >
          <span className={clsx({ "text-dark-text-muted": !selectedLabel })}>
            {selectedLabel || placeholder}
          </span>
          {rightIcon || (
            <svg
              className={clsx("w-5 h-5 transition-transform duration-focus", {
                "rotate-180": isOpen,
              })}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-dark-card border border-dark-border rounded-input shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={clsx(
                  "w-full px-4 py-2 text-left text-sm text-dark-text",
                  "hover:bg-dark-card-hover transition-colors duration-hover",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  {
                    "bg-primary-600 text-white hover:bg-primary-700":
                      value === option.value,
                  },
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <select
          className="sr-only"
          value={value}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-DEFAULT font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-dark-text-secondary">{helperText}</p>
      )}
    </div>
  );
}

export default Select;
export type { SelectProps };
