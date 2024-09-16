export interface ChartDataItem {
  id: string;
  name: string;
  value: string;
}

export interface ChartProps {
  labelFormat?: string;
  data: ChartDataItem[];
  type: "squarified" | "stripes" | "strip" | "sliceAndDice";
}
