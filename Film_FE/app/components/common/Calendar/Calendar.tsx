"use client";

import clsx from "clsx";
import { useState, useMemo } from "react";
import type { InputHTMLAttributes } from "react";

interface CalendarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: Date | string;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
}

function Calendar({
  label,
  error,
  helperText,
  className,
  value,
  onChange,
  minDate,
  maxDate,
  showTime = false,
  disabled,
  ...props
}: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value) return new Date(value);
    return null;
  });
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());

  const dateValue = useMemo(() => {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value) return new Date(value);
    return null;
  }, [value]);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (showTime && selectedDate) {
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
    }
    setSelectedDate(newDate);
    onChange?.(newDate);
    if (!showTime) {
      setIsOpen(false);
    }
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setSelectedDate(newDate);
      onChange?.(newDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    if (showTime) {
      const hours = String(date.getHours()).padStart(2, "0");
      const mins = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${mins}`;
    }
    return `${year}-${month}-${day}`;
  };

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewDate.getMonth() &&
      selectedDate.getFullYear() === viewDate.getFullYear()
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-text mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={formatDate(selectedDate)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          placeholder="Select date"
          className={clsx(
            "w-full px-4 py-2 rounded-input",
            "bg-dark-card border border-dark-border",
            "text-dark-text placeholder-dark-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "transition-all duration-focus",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "cursor-pointer",
            {
              "border-error-DEFAULT focus:ring-error-DEFAULT": error,
            },
            className,
          )}
          {...props}
        />
        {isOpen && !disabled && (
          <div className="absolute z-50 mt-1 bg-dark-card border border-dark-border rounded-card shadow-lg p-4 w-80">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.getFullYear(), viewDate.getMonth() - 1),
                  )
                }
                className="p-2 hover:bg-dark-card-hover rounded-button transition-colors duration-hover"
              >
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="text-dark-text font-semibold">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
              <button
                type="button"
                onClick={() =>
                  setViewDate(
                    new Date(viewDate.getFullYear(), viewDate.getMonth() + 1),
                  )
                }
                className="p-2 hover:bg-dark-card-hover rounded-button transition-colors duration-hover"
              >
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-dark-text-secondary py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => !isDateDisabled(day) && handleDateSelect(day)}
                  disabled={isDateDisabled(day)}
                  className={clsx(
                    "p-2 text-sm rounded-button transition-colors duration-hover",
                    {
                      "text-dark-text hover:bg-dark-card-hover":
                        !isDateSelected(day),
                      "bg-primary-600 text-white hover:bg-primary-700":
                        isDateSelected(day),
                      "opacity-50 cursor-not-allowed": isDateDisabled(day),
                    },
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
            {showTime && selectedDate && (
              <div className="mt-4 pt-4 border-t border-dark-border flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-dark-text-secondary mb-1">
                    Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={selectedDate.getHours()}
                    onChange={(e) =>
                      handleTimeChange(
                        Number(e.target.value),
                        selectedDate.getMinutes(),
                      )
                    }
                    className="w-full px-3 py-2 rounded-input bg-dark-surface border border-dark-border text-dark-text"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-dark-text-secondary mb-1">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={selectedDate.getMinutes()}
                    onChange={(e) =>
                      handleTimeChange(
                        selectedDate.getHours(),
                        Number(e.target.value),
                      )
                    }
                    className="w-full px-3 py-2 rounded-input bg-dark-surface border border-dark-border text-dark-text"
                  />
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDate(null);
                  onChange?.(null);
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-primary-600 text-white rounded-button hover:bg-primary-700 transition-colors duration-hover"
              >
                Done
              </button>
            </div>
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

export default Calendar;
export type { CalendarProps };
