export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
  scope?: string;
  criticalities: string[];
}

export interface ReportQuery {
  keys: {
    environment: string | null;
    service: string | null;
    lastDays: number | null;
  }[];
}

export interface GetServicesPayload {
  environment: string | null;
}

export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
  lastDays: number | null;
}

export interface ServiceData {
  key: {
    environment: string;
    service: string;
    lastDays: number | null;
  };
  issues: number;
  impact: number;
  criticality: number;
}

export interface ServiceMetricsReport {
  reports: ServiceData[];
}

export type ScoreCriterion = "impact" | "criticality";
