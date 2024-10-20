import { Point, Rect, getPointRect, isPointBelongsToRect } from "@/Shared";
import { PointForMatrixConnection } from "../type";

// Поиск не принадлежащих прямоугольнику точек, которые находятся на растояние заданного отступа от заданной точки.
const findPointsOutsideRectInIndentFromGivenPoint = (
  point: Point,
  rect: Rect,
  indent: number
) => {
  const { x, y } = point;
  const pointsOutsideRectInIndentArr: Point[] = [];
  const pointsInIndentArr = [
    { x: +x + indent, y: y },
    { x: +x - indent, y: y },
    { x: x, y: +y + indent },
    { x: x, y: +y - indent },
  ];
  pointsInIndentArr.forEach((pointInIndent) => {
    if (!isPointBelongsToRect(pointInIndent, rect)) {
      pointsOutsideRectInIndentArr.push(pointInIndent);
    }
  });
  return pointsOutsideRectInIndentArr;
};

export const findRectPointsForMatrix = (
  point: Point,
  rect: Rect,
  indent?: number
) => {
  const {
    size: { width, height },
  } = rect;
  const currentIndent = indent || 5;
  const RectPointsForMatrixArr: PointForMatrixConnection[] = [
    {
      point: point,
      type: "ConnectionPoint",
      rectId: rect.id,
    },
  ];

  const pointsOutsideRectInIndentArr =
    findPointsOutsideRectInIndentFromGivenPoint(point, rect, currentIndent);

  pointsOutsideRectInIndentArr.forEach((pointItem) => {
    if (
      findPointsOutsideRectInIndentFromGivenPoint(
        pointItem,
        rect,
        currentIndent
      ).length === 3
    ) {
      RectPointsForMatrixArr.push({
        point: pointItem,
        type: "PointOppositeConnectionPoint",
        rectId: rect.id,
      });
    }
  });

  const pointsRectArr = Object.values(
    getPointRect({
      ...rect,
      size: {
        width: +width + 2 * currentIndent,
        height: +height + 2 * currentIndent,
      },
    })
  );

  pointsRectArr.forEach((pointRect) => {
    RectPointsForMatrixArr.push({
      point: pointRect,
      rectId: rect.id,
      type: "pointOnCornerOfRect",
    });
  });

  return RectPointsForMatrixArr;
};
