"use client";

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface ComboboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onSelect"
> {
  label?: string;
  error?: string;
  helperText?: string;
  options: ComboboxOption[];
  placeholder?: string;
  rightIcon?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string | number) => void;
  filterOptions?: (
    options: ComboboxOption[],
    inputValue: string,
  ) => ComboboxOption[];
}

function Combobox({
  label,
  error,
  helperText,
  className,
  options,
  placeholder = "Type to search or select",
  rightIcon,
  disabled,
  value,
  onChange,
  onSelect,
  filterOptions,
  ...props
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(String(value || ""));
  const [filteredOptions, setFilteredOptions] =
    useState<ComboboxOption[]>(options);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(String(value));
    }
  }, [value]);

  useEffect(() => {
    if (filterOptions) {
      setFilteredOptions(filterOptions(options, inputValue));
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue, options, filterOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    if (onChange) {
      onChange(e);
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;
    setInputValue(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value);
    }
    if (onChange) {
      const event = {
        target: { value: String(option.value) },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-1.5">
          {label}
        </label>
      )}
      <div className="relative" ref={comboboxRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            disabled={disabled}
            placeholder={placeholder}
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
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-dark-card border border-dark-border rounded-input shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={clsx(
                  "w-full px-4 py-2 text-left text-sm text-dark-text",
                  "hover:bg-dark-card-hover transition-colors duration-hover",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
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

export default Combobox;
export type { ComboboxProps };
