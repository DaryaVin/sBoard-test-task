import { RectData, RectDataFieldset } from "@/Entities/RectWithPoin";
import { findConnectionPointByAngle } from "@/Features/findConnectionPointByAngle";
import { ConnectionPoint, InitialDataInCorrectFormat, Rect } from "@/Shared";
import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type DataFormProps = {
  onSubmit: (v: InitialDataInCorrectFormat) => void;
};

export const DataForm = ({ onSubmit }: DataFormProps) => {
  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<Omit<RectData, "id">>();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<Omit<RectData, "id">>();

  const [Data, setData] = useState<Partial<InitialDataInCorrectFormat>>({});

  const handleRect = (id: "1" | "2") => {
    const handleCreate: SubmitHandler<Omit<RectData, "id">> = async (data) => {
      const rect: Rect = {
        id,
        position: {
          x: data.x,
          y: data.y,
        },
        size: {
          width: data.width,
          height: data.height,
        },
      };
      const connectionPoint: ConnectionPoint | null =
        findConnectionPointByAngle(data.angleConnectionPoint, rect);
      setData((prev) => {
        return {
          ...prev,
          ["rect" + id]: rect,
          ["connectionPoint" + id]: connectionPoint,
        };
      });
    };
    return handleCreate;
  };

  const handleСalculate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await handleSubmit1(handleRect("1"))(e);
    await handleSubmit2(handleRect("2"))(e);
  };

  useEffect(() => {
    if (
      Data.rect1 &&
      Data.rect2 &&
      Data.connectionPoint1 &&
      Data.connectionPoint2
    ) {
      onSubmit({
        rect1: Data.rect1,
        rect2: Data.rect2,
        connectionPoint1: Data.connectionPoint1,
        connectionPoint2: Data.connectionPoint2,
      });
    }
  }, [Data]);
  return (
    <Stack
      component={"form"}
      width={"100%"}
      minWidth={650}
      maxWidth={1000}
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ border: 0, p: 0 }}
    >
      <Stack
        component={"div"}
        direction={"row"}
        width={"100%"}
        minWidth={650}
        maxWidth={1000}
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{ border: 0, p: 0 }}
      >
        <RectDataFieldset control={control1} errors={errors1} idRect="1" />
        <RectDataFieldset control={control2} errors={errors2} idRect="2" />
      </Stack>
      <Button variant="contained" onClick={handleСalculate}>
        Рассчитать
      </Button>
    </Stack>
  );
};
