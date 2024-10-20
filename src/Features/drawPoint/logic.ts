import { Point } from "@/Shared";

export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  color: string = "crimson"
) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
