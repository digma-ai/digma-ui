import { TickData } from "../types";

export interface XAxisTickProps {
  payload: { value: number };
  textAnchor?: "start" | "end" | "middle" | "inherit";
  ticks: Record<number, TickData>;
}
