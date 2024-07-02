export interface ClientSpanOverallImpactEntry {
  spanCodeObjectId: string;
  displayName: string;
  overallImpact: number;
}

export interface ClientSpansPerformanceImpactProps {
  environment: string;
}
