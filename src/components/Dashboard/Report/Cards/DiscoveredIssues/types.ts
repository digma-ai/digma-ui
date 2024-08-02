export interface DiscoveredIssuesStatistics {
  totalCount: number;
  criticalCount: number;
  activeCount: number;
  fixedCount: number;
  regressionCount: number;
}

export interface DiscoveredIssuesProps {
  statistics: DiscoveredIssuesStatistics | undefined;
}
