import { dataConverter } from "@/Features/dataConverter";
import {
  InitialDataInCorrectFormat,
  getPointRect,
  isPointBelongsToRect,
} from "@/Shared";
import { DataForm } from "@/Widgets/DataForm";
import { renderCanvas } from "@/Widgets/RenderCanvas";
import { startCanvas } from "@/Widgets/StartCanvas";
import { Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const MainPage = () => {
  const INDENT = 5;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setctx] = useState<CanvasRenderingContext2D | null>(null);
  const [dataError, setDataError] = useState<string>("");

  useEffect(() => {
    if (canvasRef.current) {
      startCanvas(canvasRef.current, setctx);
    }
  }, []);

  const onSubmit = (v: InitialDataInCorrectFormat) => {
    const { rect1, rect2, connectionPoint1, connectionPoint2 } = v;
    if (
      isPointBelongsToRect(connectionPoint1.point, rect2) ||
      isPointBelongsToRect(connectionPoint2.point, rect1)
    ) {
      setDataError(
        "Точка соединения не должна входить в соседний прямоугольник"
      );
    } else {
      const pointRect1 = getPointRect(rect1);
      const pointRect2 = getPointRect(rect2);
      for (const point of [
        ...Object.values(pointRect1),
        ...Object.values(pointRect2),
      ]) {
        if (
          point.x < INDENT ||
          point.x > 1020 - INDENT ||
          point.y < INDENT ||
          point.y > 1020 - INDENT
        ) {
          setDataError("Прямоугольник выходит за пределы видимости ");
          break;
        } else {
          setDataError("");
          const pointsPath = dataConverter(
            rect1,
            rect2,
            connectionPoint1,
            connectionPoint2
          );
          if (ctx && canvasRef.current) {
            renderCanvas(
              ctx,
              canvasRef.current,
              rect1,
              rect2,
              connectionPoint1,
              connectionPoint2,
              pointsPath
            );
          }
        }
      }
    }
  };
  return (
    <Stack
      component={"fieldset"}
      className="page"
      width={"100%"}
      minWidth={1000}
      maxWidth={1200}
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      sx={{ border: 0, p: 0 }}
    >
      <DataForm onSubmit={onSubmit} />
      <Typography color="red">{dataError}</Typography>
      <canvas
        ref={canvasRef}
        className="page__canvas"
        width={1020}
        height={1020}
      >
        Здесь будет нарисован график
      </canvas>
    </Stack>
  );
};
