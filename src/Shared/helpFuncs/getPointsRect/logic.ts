import { Rect } from "@/Shared/type";
import { pointsRect } from "./type";

export const getPointRect = (rect: Rect): pointsRect => {
  const {
    position: { x, y },
    size: { width, height },
  } = rect;
  return {
    topRightPointOfRect: {
      x: +x + 0.5 * width,
      y: +y + 0.5 * height,
    },
    bottomLeftPointOfRect: {
      x: +x - 0.5 * width,
      y: +y - 0.5 * height,
    },
    topLeftPointOfRect: {
      x: +x - 0.5 * width,
      y: +y + 0.5 * height,
    },
    bottomRightPointOfRect: {
      x: +x + 0.5 * width,
      y: +y - 0.5 * height,
    },
  };
};
