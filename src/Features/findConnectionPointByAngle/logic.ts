import { ConnectionPoint, Point, Rect, getPointRect } from "@/Shared";

export const findConnectionPointByAngle = (
  angle: ConnectionPoint["angle"],
  rect: Rect
) => {
  const {
    position: { x, y },
  } = rect;
  const { bottomLeftPointOfRect, topRightPointOfRect } = getPointRect(rect);
  const angleInRadian = ((angle - 90) * Math.PI) / 180.0;

  // уравнение луча, который выходит из центра прямоугольника под заданным углом:
  // x(t) = x0 + t * cos(θ)
  // y(t) = y0 + t * sin(θ)

  // t — параметр, который определяет положение точки на луче,
  // (x0,y0) - координаты начала луча

  // пересечения с границами прямоугольника:
  // Для левого края: x1 = x0 + t * cos(θ) → t = (x1 - x0) / cos(θ)
  // Для правого края: x2 = x0 + t * cos(θ) → t = (x2 - x0) / cos(θ)
  // Для нижнего края: y1 = y0 + t * sin(θ) → t = (y1 - y0) / sin(θ)
  // Для верхнего края: y2 = y0 + t * sin(θ) → t = (y2 - y0) / sin(θ)

  // (x1,y1) - координаты левой нижней вершины прямоугольника
  // (x2,y2) - координаты правой верхней  вершины прямоугольника

  const paramIntersectionWithSidesRectArr = [
    (bottomLeftPointOfRect.x - x) / Math.cos(angleInRadian),
    (topRightPointOfRect.x - x) / Math.cos(angleInRadian),
    (bottomLeftPointOfRect.y - y) / Math.sin(angleInRadian),
    (topRightPointOfRect.y - y) / Math.sin(angleInRadian),
  ];

  // Поиск минимального положительного значение t
  const paramIntersection = Math.min(
    ...paramIntersectionWithSidesRectArr.filter((param) => {
      return param >= 0;
    })
  );

  const connectionPoint: ConnectionPoint = {
    point: {
      x: +x + paramIntersection * Math.cos(angleInRadian),
      y: +y + paramIntersection * Math.sin(angleInRadian),
    },
    angle,
  };

  return connectionPoint;
};
