import { drawLine } from "@/Features/drawLine";
import { drawPoint } from "@/Features/drawPoint";
import { drawRect } from "@/Features/drawRect";
import { setBackgraundCanvas } from "@/Features/setBackgraundCanvas";
import { ConnectionPoint, Point, Rect } from "@/Shared";

export async function renderCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  rect1: Rect,
  rect2: Rect,
  connectionPoint1: ConnectionPoint,
  connectionPoint2: ConnectionPoint,
  pointsPathArr: Point[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setBackgraundCanvas(canvas);

  drawRect(ctx, rect1);
  drawRect(ctx, rect2);

  drawPoint(ctx, connectionPoint1.point);
  drawPoint(ctx, connectionPoint2.point);

  for (let index = 1; index < pointsPathArr.length; index++) {
    const point1 = pointsPathArr[index - 1];
    const point2 = pointsPathArr[index];

    drawLine(ctx, point1, point2);
  }
}
