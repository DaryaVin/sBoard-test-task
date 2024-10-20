import { Point, Rect } from "@/Shared";

export const isPointBelongsToRect = (point: Point, rect: Rect) => {
  const {
    position: { x, y },
    size: { width, height },
  } = rect;

  return (
    point.x >= +x - 0.5 * width &&
    point.x <= +x + 0.5 * width &&
    point.y >= +y - 0.5 * height &&
    point.y <= +y + 0.5 * height
  );
};
