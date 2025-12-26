"use client";

import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Combobox from "./Combobox";
import type { ComboboxProps, ComboboxOption } from "./Combobox";

interface ComboboxControllerProps<T extends FieldValues> extends Omit<
  ComboboxProps,
  "value" | "onChange"
> {
  name: FieldPath<T>;
  control: Control<T>;
  options: ComboboxOption[];
}

function ComboboxController<T extends FieldValues>({
  name,
  control,
  options,
  ...props
}: ComboboxControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);
        return (
          <Combobox
            {...props}
            options={options}
            value={selectedOption ? selectedOption.label : field.value || ""}
            onChange={(e) => {
              const inputValue = e.target.value;
              const matchedOption = options.find(
                (opt) => opt.label.toLowerCase() === inputValue.toLowerCase(),
              );
              field.onChange(matchedOption ? matchedOption.value : inputValue);
            }}
            onSelect={(value) => {
              field.onChange(value);
            }}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default ComboboxController;
export type { ComboboxControllerProps };
