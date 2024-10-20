import { Point, Rect, Segment } from "../type";
import { getPointRect } from "./getPointsRect";

function direction(segment: Segment, point: Point) {
  const {
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
  } = segment;
  const { x, y } = point;

  return (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
}

function onSegment(segment: Segment, point: Point) {
  const {
    point1: { x: x1, y: y1 },
    point2: { x: x2, y: y2 },
  } = segment;
  const { x, y } = point;

  return (
    Math.min(x1, x2) <= x &&
    x <= Math.max(x1, x2) &&
    Math.min(y1, y2) <= y &&
    y <= Math.max(y1, y2)
  );
}

const segmentsIntersect = (segment1: Segment, segment2: Segment) => {
  const d1 = direction(segment2, segment1.point1);
  const d2 = direction(segment2, segment1.point2);
  const d3 = direction(segment1, segment2.point1);
  const d4 = direction(segment1, segment2.point2);

  // Общий случай
  if (d1 * d2 < 0 && d3 * d4 < 0) {
    return true;
  }

  // Коллинеарные случаи
  if (d1 === 0 && onSegment(segment2, segment1.point1)) return true;
  if (d2 === 0 && onSegment(segment2, segment1.point2)) return true;
  if (d3 === 0 && onSegment(segment1, segment2.point1)) return true;
  if (d4 === 0 && onSegment(segment1, segment2.point2)) return true;

  return false;
};

export const isIntersectionRectAndSegment = (segment: Segment, rect: Rect) => {
  const {
    topRightPointOfRect,
    bottomLeftPointOfRect,
    bottomRightPointOfRect,
    topLeftPointOfRect,
  } = getPointRect(rect);

  // Проверка пересечения с каждой из четырех сторон прямоугольника
  const sidesRectArr: Segment[] = [
    {
      point1: topLeftPointOfRect,
      point2: topRightPointOfRect,
    },
    {
      point1: topRightPointOfRect,
      point2: bottomRightPointOfRect,
    },
    {
      point1: bottomRightPointOfRect,
      point2: bottomLeftPointOfRect,
    },
    {
      point1: bottomLeftPointOfRect,
      point2: topLeftPointOfRect,
    },
  ];

  for (const side of sidesRectArr) {
    if (segmentsIntersect(side, segment)) {
      return true;
    }
  }

  // Проверка, попадает ли одна из точек отрезка внутрь прямоугольника
  if (
    onSegment(
      { point1: topLeftPointOfRect, point2: bottomRightPointOfRect },
      segment.point1
    ) ||
    onSegment(
      { point1: topLeftPointOfRect, point2: bottomRightPointOfRect },
      segment.point2
    )
  ) {
    return true;
  }
  return false;
};
