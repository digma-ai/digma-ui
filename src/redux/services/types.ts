import type { RecommendationPriority } from "../../components/Admin/Reports/CodeIssues/IssuesSidebar/SuggestionBar/types";
import type {
  DeploymentType,
  EnvironmentType
} from "../../components/common/App/types";
import type { GenericCodeObjectInsight } from "../../components/Insights/types";

export type IssueCriticality = "Low" | "Medium" | "High";

export interface GetAboutResponse {
  applicationVersion: string;
  deploymentType: DeploymentType;
  isCentralize: boolean;
  site?: string;
}

export interface GetUserProfileResponse {
  email: string;
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

export interface GetIssuesPayload {
  environment?: string;
  scopedSpanCodeObjectId?: string;
  displayName?: string;
  showDismissed?: boolean;
  filters?: string[];
  services?: string[];
  insightTypes?: string[];
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

export interface GetIssuesResponse {
  insights: GenericCodeObjectInsight[];
  totalCount: number;
  dismissedCount?: number;
  unreadCount?: number;
}

export interface MarkInsightAsReadPayload {
  insightIds: string[];
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
  accountId: string;
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

export interface IssueRecommendation {
  title: string;
  priority: RecommendationPriority;
  description: string;
  actionItems: string[];
  modifiedCode: string;
  searchTerms: string[];
  sources: IssueRecommendationSource[];
}

export interface GetIssueRecommendationsResponse {
  recommendations: IssueRecommendation[];
}
