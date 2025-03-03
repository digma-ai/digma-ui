import type {
  DeploymentType,
  Environment,
  EnvironmentType
} from "../../components/common/App/types";
import type { InsightFilterType } from "../../components/Insights/InsightsCatalog/types";
import type {
  GenericCodeObjectInsight,
  InsightType,
  InsightViewType
} from "../../components/Insights/types";

export type IssueCriticality = "Low" | "Medium" | "High";

export interface GetAboutResponse {
  applicationVersion: string;
  deploymentType: DeploymentType;
  isCentralize: boolean;
  site?: string;
}

export interface GetUserProfileResponse {
  email: string;
  uid?: string;
}

export interface GetMetricsReportDataPayloadV1 {
  keys: {
    environment: string;
    service: string;
    lastDays: number | null;
  }[];
}

export interface GetMetricsReportDataPayloadV2 {
  criticalities: IssueCriticality[];
  keys: {
    environment: string;
    service: string | null;
    lastDays: number | null;
  }[];
}

export interface ServiceIssuesData {
  key: {
    environment: string;
    service: string;
    lastDays: number | null;
  };
  issues: number;
  impact: number;
  criticality: number;
}

export interface SetMetricsReportDataPayload {
  reports: ServiceIssuesData[];
}

export interface GetServiceEndpointsPayload {
  environment: string;
  service: string;
}

export interface EndpointData {
  displayName: string;
  spanCodeObjectId: string;
  uid?: string;
}

export interface SetServiceEndpointsPayload {
  endpoints: EndpointData[];
}

export interface GetEndpointsIssuesPayload {
  environment: string;
  service: string;
  endpoints: string[];
  criticalities: IssueCriticality[];
  lastDays: number | null;
}

export interface EndpointIssuesData {
  displayName: string;
  spanCodeObjectId: string;
  issues: number;
  impact: number;
  criticality: number;
}

export interface SetEndpointsIssuesPayload {
  reports: EndpointIssuesData[];
}

export interface GetServiceEnvironmentsPayload {
  service: string;
}

export interface SetServiceEnvironmentsPayload {
  environments: {
    id: string;
    name: string;
    type: EnvironmentType;
  }[];
}

export type GetEnvironmentsResponse = {
  type: "Private" | "Public";
  id: string;
  name: string;
}[];

export interface GetEnvironmentServicesPayload {
  environment: string | null;
}

export type GetEnvironmentServicesResponse = string[];

export interface GetInsightsPayload {
  filters?: string[];
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
  showDismissed?: boolean;
  showUnreadOnly?: boolean;
  displayName?: string;
  services?: string;
  insights?: string;
  operations?: string;
  scopedSpanCodeObjectId?: string;
  directOnly?: boolean;
  environment?: string;
}

export interface ExtendedGetInsightsPayload {
  data: GetInsightsPayload;
  extra: {
    insightViewType?: InsightViewType;
  };
}

export interface GetInsightsResponse {
  totalCount: number;
  dismissedCount?: number;
  insights: GenericCodeObjectInsight[];
  unreadCount?: number;
}

export interface ExtendedGetInsightsResponse {
  data: GetInsightsResponse;
  extra: {
    insightViewType?: InsightViewType;
  };
}

export interface GetInsightsStatsPayload {
  displayName?: string;
  services?: string;
  insights?: string;
  operations?: string;
  scopedSpanCodeObjectId?: string;
  directOnly?: boolean;
  environment?: string;
}

export interface GetInsightsStatsResponse {
  issuesInsightsCount: number;
  analyticsInsightsCount: number;
  unreadInsightsCount: number;
  criticalInsightsCount?: number;
  allIssuesCount?: number;
  dismissedCount?: number;
}

export interface ExtendedGetInsightsStatsResponse {
  data: GetInsightsStatsResponse;
  extra: {
    spanCodeObjectId?: string;
  };
}

export interface GetIssuesPayload {
  environment?: string;
  scopedSpanCodeObjectId?: string;
  displayName?: string;
  showDismissed?: boolean;
  filters?: InsightFilterType[];
  services?: string[];
  insightTypes?: InsightType[];
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

export interface GetIssuesFiltersPayload {
  filters?: InsightFilterType[];
  services?: string[];
  insightTypes?: InsightType[];
  criticalityFilter?: IssueCriticality[];
  scopedSpanCodeObjectId?: string;
  displayName?: string;
  showDismissed?: boolean;
  environment?: string;
}

export interface IssueTypeFilter {
  name: string;
  enabled: boolean;
}

export interface GetIssuesFiltersResponse {
  issueTypeFilters: IssueTypeFilter[];
  services?: string[];
}

export interface GetIssuesResponse {
  insights: GenericCodeObjectInsight[];
  totalCount: number;
  dismissedCount?: number;
  unreadCount?: number;
}

export interface RecheckInsightPayload {
  environment: string;
  codeObjectId?: string;
  id: string;
  insightType?: string;
  sourceSpanCodeObjectId?: string;
  time: string;
}

export interface MarkInsightReadPayload {
  insightIds: string[];
}

export interface MarkScopeInsightsReadPayload {
  environment: string;
  scope?: {
    spanCodeObject?: string;
    methodCodeObjectId?: string;
    serviceName?: string;
    role?: string;
  };
}

export interface DismissUndismissInsightPayload {
  uid: string;
}

export interface LinkTicketToIssuePayload {
  environment: string;
  insightId: string;
  ticketLink: string;
}

export interface UnlinkTicketFromIssuePayload {
  environment: string;
  insightId: string;
}

export interface GetSpanPercentilesHistogramPayload {
  environment: string;
  spanCodeObjectId: string;
}

export interface GetSpanCodeLocationsPayload {
  environment: string;
  spanCodeObjectId: string;
}

export interface GetSpanCodeLocationsResponse {
  environment: string;
  spanCodeObjectId: string;
  navigationEntry: {
    spanInfo: {
      name: string;
      displayName: string;
      instrumentationLibrary: string;
      spanCodeObjectId: string;
      methodCodeObjectId: string;
      kind: string;
    };
    closestParentSpans: {
      name: string;
      displayName: string;
      instrumentationLibrary: string;
      spanCodeObjectId: string;
      methodCodeObjectId: string;
      kind: string;
      navItemType: string;
      distance: number;
    }[];
    navEndpointEntry: {
      endpointCodeObjectId: string;
      displayName: string;
      methodCodeObjectId: string;
    };
    closestParentEntries: {
      endpointCodeObjectId: string;
      displayName: string;
      methodCodeObjectId: string;
    }[];
  };
}

export interface GetSpanInsightPayload {
  spanCodeObjectId: string;
  insightType: string;
  environment: string;
}

export type GetSpanInsightResponse = GenericCodeObjectInsight;

export interface LinkTicketResponse {
  ticketLink: string | null;
  success: boolean;
  message: string | null;
}

export interface GetIssueRecommendationsPayload {
  IssueId: string;
}

export interface IssueRecommendationSource {
  title: string;
  url: string;
}

export enum RecommendationPriority {
  Low = "low",
  Medium = "medium",
  High = "high"
}

export interface IssueRecommendation {
  title: string;
  priority: RecommendationPriority;
  description: string;
  actionItems: string[];
  modifiedCode: string;
  searchTerms: string[];
  sources: IssueRecommendationSource[];
}

export interface GetSpanByIdPayload {
  id: string;
}

export interface GetSpanByIdResponse {
  environmentId: string;
  spanCodeObjectId: string;
}

export interface GetSpanInfoPayload {
  spanCodeObjectId: string;
}

export interface LinkedEndpoint {
  spanCodeObjectId: string;
  displayName: string;
  environment: string;
}

export interface GetSpanInfoResponse {
  displayName: string;
  services: string[];
  environments: Environment[];
  assetTypeId: string;
  firstSeen?: string;
  lastSeen?: string;
  linkedEndpoints?: LinkedEndpoint[];
}

export interface GetSpanEnvironmentsPayload {
  spanCodeObjectId: string;
}

export interface EnvironmentIssueCounts {
  highCriticality: number;
  mediumCriticality: number;
  lowCriticality: number;
}

export interface SpanEnvironmentDetails {
  environment: Environment;
  issueCounts: EnvironmentIssueCounts;
}

export type GetSpanEnvironmentsResponse = SpanEnvironmentDetails[];

export interface GetIssueRecommendationsResponse {
  recommendations: IssueRecommendation[];
}

export interface ExtendedGetSpanEnvironmentsResponse {
  data: GetSpanEnvironmentsResponse;
  extra: {
    spanCodeObjectId: string;
  };
}
