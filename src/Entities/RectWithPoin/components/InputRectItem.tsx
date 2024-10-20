import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { RectData } from "../types";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";

type InputRectItemProps = {
  dataKey: keyof Omit<RectData, "id">;
  label: string;
  rules?: Omit<
    RegisterOptions<
      RectData | Omit<RectData, "id">,
      keyof Omit<RectData, "id">
    >,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  control: Control<RectData | Omit<RectData, "id">>;
  errors: FieldErrors<RectData | Omit<RectData, "id">>;
} & OutlinedInputProps;

export const InputRectItem = ({
  dataKey,
  label,
  control,
  rules,
  errors,
  ...props
}: InputRectItemProps) => {
  return (
    <Controller
      name={dataKey}
      control={control}
      rules={rules || { required: "Данное поле обязательно для заполнения" }}
      render={({ field }) => (
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor={"RectItemFieldset-" + dataKey}>
            {label}
          </InputLabel>
          <OutlinedInput
            {...props}
            {...field}
            id={"RectItemFieldset-" + dataKey}
            type={"number"}
            label={label}
            error={dataKey in errors}
            required
          />
          <Typography color="red">{errors[dataKey]?.message}</Typography>
        </FormControl>
      )}
    />
  );
};
