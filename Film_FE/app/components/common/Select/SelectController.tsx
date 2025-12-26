"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Select from "./Select";
import type { SelectProps, SelectOption } from "./Select";

interface SelectControllerProps<T extends FieldValues> extends Omit<
  SelectProps,
  "value" | "onChange"
> {
  name: FieldPath<T>;
  control: Control<T>;
  options: SelectOption[];
}

function SelectController<T extends FieldValues>({
  name,
  control,
  options,
  ...props
}: SelectControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          options={options}
          value={field.value || ""}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value === "" ? undefined : value);
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export default SelectController;
export type { SelectControllerProps };
