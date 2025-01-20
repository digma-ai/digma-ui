import type { TickData } from "../types";

export interface XAxisTickProps {
  x: number;
  y: number;
  payload: { value: number };
  textAnchor?: "start" | "end" | "middle" | "inherit";
  ticks: Record<number, TickData>;
}
