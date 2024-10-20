import { setBackgraundCanvas } from "@/Features/setBackgraundCanvas";

export async function startCanvas(
  canvasElem: HTMLCanvasElement,
  setContex: (v: CanvasRenderingContext2D | null) => void
) {
  const ctx = canvasElem.getContext("2d");
  setContex(ctx);

  setBackgraundCanvas(canvasElem);
}
