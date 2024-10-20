import type {
  Point,
  Rect,
  ConnectionPoint,
  Size,
  InitialDataInCorrectFormat,
  Segment,
} from "./type";
import { getPointRect } from "./helpFuncs/getPointsRect";
import { isPointBelongsToRect } from "./helpFuncs/isPointBelongsToRect";
import { isIntersectionRectAndSegment } from "./helpFuncs/findIntersectionPointsOfRectAndSegment";
import { calculateDistanceBetweenPoints } from "./helpFuncs/calculateDistanceBetweenPoints";

export type {
  Point,
  Rect,
  ConnectionPoint,
  Size,
  InitialDataInCorrectFormat,
  Segment,
};
export {
  getPointRect,
  isPointBelongsToRect,
  isIntersectionRectAndSegment,
  calculateDistanceBetweenPoints,
};
