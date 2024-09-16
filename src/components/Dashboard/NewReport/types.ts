export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
  scope?: string;
}

export interface GetServicesPayload {
  environment: string | null;
}

export interface ReportFilterQuery {
  environmentId: string | null;
  services: string[];
}

export interface ServiceData {
  name: string;
  criticalIssuesCount: number;
  impactScore: string;
  totalIssuesCount: number;
}

export interface ServiceDashboardsData {
  data: ServiceData[];
}
