import { ServiceData } from "../types";

export interface ChartProps {
  data: ServiceData[];
  onServiceSelected: (name: string) => void;
}
