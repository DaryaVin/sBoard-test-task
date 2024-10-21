import { Rect, getPointRect } from "@/Shared";

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  color: string = "turquoise"
) => {
  const {
    size: { width, height },
  } = rect;
  const {
    bottomLeftPointOfRect: { x, y },
  } = getPointRect(rect);
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.fill();
};
