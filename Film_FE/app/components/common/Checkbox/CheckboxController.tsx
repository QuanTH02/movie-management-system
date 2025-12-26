"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Checkbox from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";

interface CheckboxControllerProps<T extends FieldValues> extends Omit<
  CheckboxProps,
  "checked" | "onChange"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

function CheckboxController<T extends FieldValues>({
  name,
  control,
  ...props
}: CheckboxControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          {...field}
          checked={field.value || false}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default CheckboxController;
export type { CheckboxControllerProps };
