export type Point = {
  x: number;
  y: number;
};
export type Size = {
  width: number;
  height: number;
};
export type Rect = {
  id: string;
  position: Point;
  size: Size;
};
export type ConnectionPoint = {
  point: Point;
  angle: number;
};

export type Segment = {
  point1: Point;
  point2: Point;
};

export type InitialDataInCorrectFormat = {
  rect1: Rect;
  rect2: Rect;
  connectionPoint1: ConnectionPoint;
  connectionPoint2: ConnectionPoint;
};
