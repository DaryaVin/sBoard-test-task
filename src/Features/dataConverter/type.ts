import { Point, Rect } from "../../Shared";

export type PointForMatrixConnection = {
  point: Point;
  rectId: Rect["id"];
  type:
    | "ConnectionPoint"
    | "pointOnCornerOfRect"
    | "PointOppositeConnectionPoint";
};

export type MatrixConnection = (number | null)[][];

export type HelperPointForMatrixConnection = (null | Point)[][];

export type MatrixConnectionsWithHelperPoint = {
  matrixPoints: PointForMatrixConnection[];
  connections: MatrixConnection;
  helperPoints: HelperPointForMatrixConnection;
};
