import { Point } from "@/Shared";
import { MatrixConnectionsWithHelperPoint } from "../type";

export const findShortestPathBetweenPoints = (
  matrix: MatrixConnectionsWithHelperPoint
) => {
  const { connections, helperPoints, matrixPoints } = matrix;
  const visitedPoint: boolean[] = new Array(matrixPoints.length).fill(false);
  const planVisitedPointIndex: number[] = [];
  const weightsMap: number[] = new Array(matrixPoints.length).fill(Infinity);
  const pathMap: number[][] = Array.from(Array(matrixPoints.length), () => {
    return new Array();
  });
  const poinsListShortestPath: Point[] = [];

  const indexStart = matrixPoints.findIndex((point) => {
    return point.type === "ConnectionPoint";
  });

  if (indexStart >= 0) {
    let indexCurrentPoint: number = indexStart;
    planVisitedPointIndex.push(indexCurrentPoint);
    weightsMap[indexCurrentPoint] = 0;
    pathMap[indexCurrentPoint].push(indexCurrentPoint);

    let counter = 0;

    do {
      connections[indexCurrentPoint].forEach((connection, index) => {
        if (typeof connection === "number" && !visitedPoint[index]) {
          planVisitedPointIndex.push(index);
          const newWeight = weightsMap[indexCurrentPoint] + connection;
          if (weightsMap[index] > newWeight) {
            weightsMap[index] = newWeight;
            pathMap[index] = [...pathMap[indexCurrentPoint], index];
          } else {
            if (weightsMap[index] === newWeight && pathMap[index].length > 0) {
              const newPath = [...pathMap[indexCurrentPoint], index];
              if (newPath.length < pathMap[index].length) {
                pathMap[index] = newPath;
              }
            }
          }
        }
      });
      visitedPoint[indexCurrentPoint] = true;

      for (let index = 0; index < planVisitedPointIndex.length; index++) {
        if (!visitedPoint[planVisitedPointIndex[index]]) {
          indexCurrentPoint = planVisitedPointIndex[index];
          break;
        }
      }
      counter++;
    } while (
      matrixPoints[indexCurrentPoint].type !== "ConnectionPoint" &&
      counter <= 30
    );

    poinsListShortestPath.push(matrixPoints[indexStart].point);
    const indexPath = pathMap[indexCurrentPoint];

    for (let index = 1; index < indexPath.length; index++) {
      const current = indexPath[index];
      const prev = indexPath[index - 1];
      const currentHelperPoint = helperPoints[current][prev];
      if (currentHelperPoint !== null) {
        poinsListShortestPath.push(currentHelperPoint);
      }
      poinsListShortestPath.push(matrixPoints[current].point);
    }
  } else {
    throw new Error("Не возмажно найти путь, так как данные сломаны");
  }

  return poinsListShortestPath;
};
