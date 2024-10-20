import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { RectData } from "../types";
import { Stack, Typography } from "@mui/material";
import { InputRectItem } from "./InputRectItem";

type DataItemFieldsetProps = {
  control: Control<RectData | Omit<RectData, "id">>;
  errors: FieldErrors<RectData | Omit<RectData, "id">>;
  idRect: RectData["id"];
};

export const RectDataFieldset = ({
  control,
  errors,
  idRect,
}: DataItemFieldsetProps) => {
  const coordinatRules = {
    required: "Данное поле обязательно для заполнения",
    max: {
      value: 1000,
      message: "Кординаты должен быть не больше 1000",
    },
    min: {
      value: 10,
      message: "Кординаты должены быть не меньше 10",
    },
  };
  const createSizeRules = (label: "Ширина" | "Высота") => {
    return {
      required: "Данное поле обязательно для заполнения",
      min: {
        value: 3,
        message: `${label} задается не меньше 5`,
      },
      max: {
        value: 500,
        message: `${label} задается не больше 500`,
      },
    };
  };

  const widthRules = createSizeRules("Ширина");
  const heightRules = createSizeRules("Высота");

  const angleRules = {
    required: "Данное поле обязательно для заполнения",
    min: {
      value: 0,
      message: "Угол должен быть не меньше 0",
    },
    max: {
      value: 360,
      message: "Угол должен быть не больше 360",
    },
  };
  return (
    <Stack
      component={"fieldset"}
      width={"100%"}
      minWidth={320}
      maxWidth={500}
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ border: 0, p: 0 }}
    >
      <Typography component={"legend"} fontSize={20} fontWeight={"bold"}>
        Данное о прямоугольнике {idRect}
      </Typography>
      <Stack
        component={"fieldset"}
        width={"100%"}
        minWidth={320}
        maxWidth={500}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ border: 0, p: 0 }}
      >
        <legend>Кординаты центра:</legend>
        <Stack
          component={"div"}
          direction="row"
          width={"100%"}
          minWidth={320}
          maxWidth={500}
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          sx={{ border: 0, p: 0 }}
        >
          <InputRectItem
            control={control}
            errors={errors}
            label={`Кордината X (от ${coordinatRules.min.value} до ${coordinatRules.max.value})`}
            dataKey={"x"}
            rules={coordinatRules}
          />
          <InputRectItem
            control={control}
            errors={errors}
            label={`Кордината Y (от ${coordinatRules.min.value} до ${coordinatRules.max.value})`}
            rules={coordinatRules}
            dataKey={"y"}
          />
        </Stack>
      </Stack>
      <Stack
        component={"fieldset"}
        width={"100%"}
        minWidth={320}
        maxWidth={500}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ border: 0, p: 0 }}
      >
        <legend>Размеры:</legend>
        <Stack
          component={"div"}
          direction="row"
          width={"100%"}
          minWidth={320}
          maxWidth={500}
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          sx={{ border: 0, p: 0 }}
        >
          <InputRectItem
            control={control}
            errors={errors}
            label={`Ширина (от ${widthRules.min.value} до ${widthRules.max.value})`}
            dataKey={"width"}
            rules={widthRules}
          />
          <InputRectItem
            control={control}
            errors={errors}
            label={`Высота (от ${heightRules.min.value} до ${heightRules.max.value})`}
            dataKey={"height"}
            rules={heightRules}
          />
        </Stack>
      </Stack>
      <Stack
        component={"fieldset"}
        width={"100%"}
        minWidth={320}
        maxWidth={500}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ border: 0, p: 0 }}
      >
        <legend>Данные о точки соединения:</legend>
        <InputRectItem
          control={control}
          errors={errors}
          label={`Угол точки соединения (от ${angleRules.min.value} до ${angleRules.max.value})`}
          dataKey={"angleConnectionPoint"}
          rules={angleRules}
        />
      </Stack>
    </Stack>
  );
};
