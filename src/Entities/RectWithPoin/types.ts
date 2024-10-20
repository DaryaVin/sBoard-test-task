import { ConnectionPoint, Point, Rect, Size } from "@/Shared";

export type RectData = {
  id: Rect["id"];
  angleConnectionPoint: ConnectionPoint["angle"];
} & Point &
  Size;
