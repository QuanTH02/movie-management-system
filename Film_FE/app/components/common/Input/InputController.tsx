"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Input from "./Input";
import type { InputProps } from "./Input";

interface InputControllerProps<T extends FieldValues> extends Omit<
  InputProps,
  "value" | "onChange" | "onBlur" | "name"
> {
  name: FieldPath<T>;
  control: Control<T>;
}

function InputController<T extends FieldValues>({
  name,
  control,
  ...props
}: InputControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input {...props} {...field} error={fieldState.error?.message} />
      )}
    />
  );
}

export default InputController;
export type { InputControllerProps };
