"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Radio from "./Radio";
import type { RadioProps } from "./Radio";

interface RadioControllerProps<T extends FieldValues> extends Omit<
  RadioProps,
  "checked" | "onChange"
> {
  name: FieldPath<T>;
  control: Control<T>;
  value: string;
}

function RadioController<T extends FieldValues>({
  name,
  control,
  value,
  ...props
}: RadioControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Radio
          {...props}
          {...field}
          checked={field.value === value}
          onChange={() => field.onChange(value)}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default RadioController;
export type { RadioControllerProps };
