export interface InsightIconTooltipProps {
  severity?: number;
  impact?: number;
  criticality: number;
}

export interface Metric {
  label: string;
  value: number;
}
