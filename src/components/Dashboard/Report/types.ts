export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
}

export interface DiscoveredAssetsStatistics {
  totalCount: number;
  data: AssetCategory[];
}

export interface DiscoveredIssuesStatistics {
  totalCount: number;
  criticalCount: number;
  activeCount: number;
  fixedCount: number;
  regressionCount: number;
}

export interface AssetCategory {
  name: string;
  count: number;
}

export interface GetServicesPayload {
  environment: string | null;
}
