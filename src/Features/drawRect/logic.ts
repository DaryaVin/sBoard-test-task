import { Rect } from "@/Shared";

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  color: string = "turquoise"
) => {
  const {
    position: { x, y },
    size: { width, height },
  } = rect;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.fill();
};
