import { Point } from "@/Shared";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  point1: Point,
  point2: Point,
  color: string = "black"
) => {
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
};
