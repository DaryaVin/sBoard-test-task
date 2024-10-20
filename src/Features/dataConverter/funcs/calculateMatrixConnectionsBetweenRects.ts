import {
  ConnectionPoint,
  Point,
  Rect,
  Segment,
  calculateDistanceBetweenPoints,
  isIntersectionRectAndSegment,
} from "@/Shared";
import { findRectPointsForMatrix } from "./findRectPointsForMatrix";
import {
  HelperPointForMatrixConnection,
  MatrixConnection,
  MatrixConnectionsWithHelperPoint,
  PointForMatrixConnection,
} from "../type";

export const calculateMatrixConnectionsBetweenRects = (
  rect1: Rect,
  rect2: Rect,
  connectionPoint1: ConnectionPoint,
  connectionPoint2: ConnectionPoint,
  indent?: number
): MatrixConnectionsWithHelperPoint => {
  const allPointsForMatrixArr: PointForMatrixConnection[] = [
    ...findRectPointsForMatrix(connectionPoint1.point, rect1, indent),
    ...findRectPointsForMatrix(connectionPoint2.point, rect2, indent),
  ];

  const matrixConnections: MatrixConnection = Array.from(
    Array(allPointsForMatrixArr.length),
    () => {
      return new Array(allPointsForMatrixArr.length).fill(null);
    }
  );
  const matrixHelperPoints: HelperPointForMatrixConnection = Array.from(
    Array(allPointsForMatrixArr.length),
    () => {
      return new Array(allPointsForMatrixArr.length).fill(null);
    }
  );

  allPointsForMatrixArr.forEach((pointStart, index) => {
    for (let i = index; i < allPointsForMatrixArr.length; i++) {
      const pointEnd = allPointsForMatrixArr[i];

      if (index !== i) {
        if (
          (pointEnd.type === "ConnectionPoint" &&
            pointStart.type === "PointOppositeConnectionPoint") ||
          (pointStart.type === "ConnectionPoint" &&
            pointEnd.type === "PointOppositeConnectionPoint")
        ) {
          if (pointEnd.rectId === pointStart.rectId) {
            matrixConnections[index][i] = calculateDistanceBetweenPoints(
              pointEnd.point,
              pointStart.point
            );
          }
        } else {
          if (
            pointEnd.type !== "ConnectionPoint" &&
            pointStart.type !== "ConnectionPoint"
          ) {
            if (pointEnd.rectId === pointStart.rectId) {
              const segment: Segment = {
                point1: pointEnd.point,
                point2: pointStart.point,
              };
              const currentRect = rect1.id === pointEnd.rectId ? rect1 : rect2;
              if (!isIntersectionRectAndSegment(segment, currentRect)) {
                matrixConnections[index][i] = calculateDistanceBetweenPoints(
                  pointEnd.point,
                  pointStart.point
                );
              }
            } else {
              const helperPoint: Point = {
                x: pointStart.point.x,
                y: pointEnd.point.y,
              };

              const segment1: Segment = {
                point1: pointStart.point,
                point2: helperPoint,
              };
              const segment2: Segment = {
                point1: pointEnd.point,
                point2: helperPoint,
              };

              const IntersectionOfRect1AndSegment1 =
                isIntersectionRectAndSegment(segment1, rect1);
              const IntersectionOfRect1AndSegment2 =
                isIntersectionRectAndSegment(segment2, rect1);
              const IntersectionOfRect2AndSegment1 =
                isIntersectionRectAndSegment(segment1, rect2);
              const IntersectionOfRect2AndSegment2 =
                isIntersectionRectAndSegment(segment2, rect2);

              if (
                !IntersectionOfRect1AndSegment1 &&
                !IntersectionOfRect1AndSegment2 &&
                !IntersectionOfRect2AndSegment1 &&
                !IntersectionOfRect2AndSegment2
              ) {
                matrixConnections[index][i] =
                  calculateDistanceBetweenPoints(
                    segment1.point1,
                    segment1.point2
                  ) +
                  calculateDistanceBetweenPoints(
                    segment2.point1,
                    segment2.point2
                  );

                matrixHelperPoints[index][i] = helperPoint;
              }
            }
          }
        }
      }
      matrixConnections[i][index] = matrixConnections[index][i];
      matrixHelperPoints[i][index] = matrixHelperPoints[index][i];
    }
  });

  return {
    connections: matrixConnections,
    matrixPoints: allPointsForMatrixArr,
    helperPoints: matrixHelperPoints,
  };
};
