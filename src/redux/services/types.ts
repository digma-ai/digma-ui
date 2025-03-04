import type {
  DeploymentType,
  Environment,
  EnvironmentType
} from "../../components/common/App/types";
import type { InsightFilterType } from "../../components/Insights/InsightsCatalog/types";
import type {
  GenericCodeObjectInsight,
  InsightStatus,
  InsightType,
  InsightViewType
} from "../../components/Insights/types";
import type { Duration } from "../../globals";
import type { SpanInfo } from "../../types";

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

export interface GetTopIssuesHighlightsPayload {
  environments: string[];
  scopedCodeObjectId?: string;
}

export interface GetTopIssuesHighlightsV2Payload {
  environments: string[];
  scopedSpanCodeObjectId?: string;
}

export interface EnvironmentData<T> {
  environmentId: string;
  environmentName: string;
  insightStatus: InsightStatus;
  insightCriticality: number;
  metrics: T;
}

export interface HighlightData<T> {
  insightType: InsightType;
  insightSubType?: string;
  asset: SpanInfo | null;
  environments: EnvironmentData<T>[];
}

export type EndpointBottleneckMetrics = [
  {
    id: "PercentageWhenBottleneck";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "DurationWhenBottleneck";
    value: Duration;
  }
];

export type SpanEndpointBottleneckMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  { id: "RequestPercentage"; value: number },
  { id: "DurationWhenBottleneck"; value: Duration }
];

export type EndpointChattyApiV2Metrics = [
  {
    id: "Repeats";
    value: number;
  }
];

export type EndpointHighNumberOfQueriesMetrics = [
  {
    id: "QueriesCount";
    value: number;
  },
  {
    id: "TypicalQueriesCount";
    value: number;
  }
];

export type EndpointQueryOptimizationV2Metrics = [
  {
    id: "Duration";
    value: Duration;
  }
];

export type SpanQueryOptimizationMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  },
  {
    id: "TypicalDuration";
    value: Duration;
  },
  {
    id: "Database";
    value: string;
  }
];

export type EndpointSessionInViewMetrics = [];

export type EndpointSlowdownSourceMetrics = [
  {
    id: "DifferenceDelta";
    value: Duration;
  }
];

export type EndpointSpanNPlusOneMetrics = [
  {
    id: "Repeats";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  }
];

export type SpaNPlusOneMetrics = [
  {
    id: "AffectedEndpoints";
    value: number;
  },
  {
    id: "Repeats";
    value: number;
  },
  {
    id: "RequestPercentage";
    value: number;
  },
  {
    id: "Duration";
    value: Duration;
  }
];

export type HotSpotMetrics = [
  {
    id: "Score";
    value: number;
  }
];

export type SpanScalingMetrics = [
  {
    id: "IncreasePercentage";
    value: number;
  }
];

export type GenericMetrics =
  | EndpointBottleneckMetrics
  | SpanEndpointBottleneckMetrics
  | EndpointChattyApiV2Metrics
  | EndpointHighNumberOfQueriesMetrics
  | EndpointQueryOptimizationV2Metrics
  | SpanQueryOptimizationMetrics
  | EndpointSessionInViewMetrics
  | EndpointSlowdownSourceMetrics
  | EndpointSpanNPlusOneMetrics
  | SpaNPlusOneMetrics
  | HotSpotMetrics
  | SpanScalingMetrics;

export interface GetTopIssuesHighlightsResponse {
  topInsights: HighlightData<GenericMetrics>[];
}

export interface GetPerformanceHighlightsPayload {
  environments: string[];
  scopedSpanCodeObjectId?: string;
}

interface PerformancePercentileData {
  duration: Duration;
  isCritical?: boolean;
}

export interface EnvironmentPerformanceData {
  environment: {
    name: string;
    id: string;
    type: EnvironmentType;
  };
  p50: PerformancePercentileData;
  p95: PerformancePercentileData;
  lastCallTimeStamp: string | null;
}

export interface GetPerformanceHighlightsResponse {
  performance: EnvironmentPerformanceData[];
}

export interface GetImpactHighlightsPayload {
  environments: string[];
  scopedSpanCodeObjectId?: string;
}

export interface EnvironmentImpactData {
  environmentName: string;
  environmentId: string;
  rank: number;
  rankNormalized: number;
  impact: number;
}

export interface GetImpactHighlightsResponse {
  impactHighlights: EnvironmentImpactData[];
}

export interface GetScalingHighlightsPayload {
  environments: string[];
  scopedSpanCodeObjectId?: string;
}

export interface ScalingMetrics {
  concurrency: number;
  duration: Duration;
}

export interface EnvironmentScalingData {
  environmentId: string;
  environmentName: string;
  insightStatus: InsightStatus;
  criticality: number;
  metrics: ScalingMetrics;
}

export interface GetScalingHighlightsResponse {
  dataState: "NoData" | "Partial" | "ScalingWell" | "ScalingBadly";
  scaling: EnvironmentScalingData[];
}

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

export interface LinkTicketToIssuePayload {
  environment: string;
  insightId: string;
  ticketLink: string;
}

export interface UnlinkTicketFromIssuePayload {
  environment: string;
  insightId: string;
}

export interface DismissUndismissInsightPayload {
  uid: string;
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
