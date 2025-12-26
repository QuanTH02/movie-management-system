"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Calendar from "./Calendar";
import type { CalendarProps } from "./Calendar";

interface CalendarControllerProps<T extends FieldValues> extends Omit<
  CalendarProps,
  "value" | "onChange"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

function CalendarController<T extends FieldValues>({
  name,
  control,
  ...props
}: CalendarControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        let dateValue: Date | null = null;
        if (field.value) {
          if (typeof field.value === "string") {
            dateValue = new Date(field.value);
          } else if (
            field.value &&
            typeof field.value === "object" &&
            "getTime" in field.value &&
            typeof (field.value as Date).getTime === "function"
          ) {
            dateValue = field.value as Date;
          }
        }

        return (
          <Calendar
            {...props}
            value={dateValue || undefined}
            onChange={(date) => {
              field.onChange(date ? date.toISOString() : null);
            }}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default CalendarController;
export type { CalendarControllerProps };
