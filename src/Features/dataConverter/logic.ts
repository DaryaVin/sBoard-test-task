import { ConnectionPoint, Rect } from "@/Shared";
import { calculateMatrixConnectionsBetweenRects } from "./funcs/calculateMatrixConnectionsBetweenRects";
import { findShortestPathBetweenPoints } from "./funcs/findShortestPathBetweenPoints";

export const dataConverter = (
  rect1: Rect,
  rect2: Rect,
  connectionPoint1: ConnectionPoint,
  connectionPoint2: ConnectionPoint,
  indent?: number
) => {
  const MatrixConnectionsWithHelperPoint =
    calculateMatrixConnectionsBetweenRects(
      rect1,
      rect2,
      connectionPoint1,
      connectionPoint2,
      indent
    );
  const findShortestPath = findShortestPathBetweenPoints(
    MatrixConnectionsWithHelperPoint
  );
  return findShortestPath;
};
