import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isString } from "../../typeGuards/isString";
import type {
  CreateEnvironmentPayload,
  CreateEnvironmentResponse,
  DeleteEnvironmentPayload,
  DeleteEnvironmentResponse,
  DismissErrorPayload,
  DismissUndismissInsightPayload,
  ExtendedGetInsightsPayload,
  ExtendedGetInsightsResponse,
  ExtendedGetInsightsStatsResponse,
  ExtendedGetSpanEnvironmentsResponse,
  GetAboutResponse,
  GetAssetsCategoriesPayload,
  GetAssetsCategoriesResponse,
  GetAssetsFiltersPayload,
  GetAssetsFiltersResponse,
  GetAssetsPayload,
  GetAssetsResponse,
  GetBlockedTracesPayload,
  GetBlockedTracesResponse,
  GetEndpointsIssuesPayload,
  GetEnvironmentServicesPayload,
  GetEnvironmentServicesResponse,
  GetEnvironmentsResponse,
  GetErrorPayload,
  GetErrorResponse,
  GetErrorsPayload,
  GetErrorsResponse,
  GetErrorsTimeseriesResponse,
  GetErrorTimeseriesPayload,
  GetGlobalErrorsFiltersPayload,
  GetGlobalErrorsFiltersResponse,
  GetGlobalErrorsPayload,
  GetGlobalErrorsResponse,
  GetImpactHighlightsPayload,
  GetImpactHighlightsResponse,
  GetIncidentAgentEventsPayload,
  GetIncidentAgentEventsResponse,
  GetIncidentAgentsPayload,
  GetIncidentAgentsResponse,
  GetIncidentPayload,
  GetIncidentResponse,
  GetIncidentsResponse,
  GetInsightsResponse,
  GetInsightsStatsPayload,
  GetInsightsStatsResponse,
  GetIssueRecommendationsPayload,
  GetIssueRecommendationsResponse,
  GetIssuesFiltersPayload,
  GetIssuesFiltersResponse,
  GetIssuesPayload,
  GetIssuesResponse,
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  GetPerformanceHighlightsPayload,
  GetPerformanceHighlightsResponse,
  GetRecentActivityPayload,
  GetRecentActivityResponse,
  GetScalingHighlightsPayload,
  GetScalingHighlightsResponse,
  GetServiceEndpointsPayload,
  GetServiceEnvironmentsPayload,
  GetSpanByIdPayload,
  GetSpanByIdResponse,
  GetSpanCodeLocationsPayload,
  GetSpanCodeLocationsResponse,
  GetSpanEnvironmentsPayload,
  GetSpanEnvironmentsResponse,
  GetSpanInfoPayload,
  GetSpanInfoResponse,
  GetSpanInsightPayload,
  GetSpanInsightResponse,
  GetSpanPercentilesHistogramPayload,
  GetTopIssuesHighlightsPayload,
  GetTopIssuesHighlightsResponse,
  GetTopIssuesHighlightsV2Payload,
  GetUserProfileResponse,
  LinkTicketResponse,
  LinkTicketToIssuePayload,
  MarkInsightReadPayload,
  MarkScopeInsightsReadPayload,
  PinErrorPayload,
  RecheckInsightPayload,
  ResendConfirmationEmailPayload,
  SetEndpointsIssuesPayload,
  SetMetricsReportDataPayload,
  SetServiceEndpointsPayload,
  SetServiceEnvironmentsPayload,
  UndismissErrorPayload,
  UnlinkTicketFromIssuePayload,
  UnpinErrorPayload
} from "./types";

export const digmaApi = createApi({
  tagTypes: [
    "Asset",
    "AssetCategory",
    "Environment",
    "Error",
    "Insight",
    "RecentActivity"
  ],
  reducerPath: "digmaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: isString(window.digmaApiProxyPrefix)
      ? window.digmaApiProxyPrefix
      : "/api/",
    credentials: "same-origin"
  }),
  endpoints: (builder) => ({
    getAbout: builder.query<GetAboutResponse, void>({
      query: () => "About"
    }),
    getAssetsFilters: builder.query<
      GetAssetsFiltersResponse,
      GetAssetsFiltersPayload
    >({
      query: (data) => ({
        url: "Assets/get_filter",
        params: data
      })
    }),
    getAssetsCategories: builder.query<
      GetAssetsCategoriesResponse,
      GetAssetsCategoriesPayload
    >({
      query: (data) => ({
        url: "Assets/get_categories",
        params: data
      }),
      providesTags: ["AssetCategory"]
    }),
    getAssets: builder.query<GetAssetsResponse, GetAssetsPayload>({
      query: (data) => ({
        url: "Assets/get_assets",
        params: data
      }),
      providesTags: ["Asset"]
    }),
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => "Authentication/logged-in-user"
    }),
    resendConfirmationEmail: builder.mutation<
      void,
      ResendConfirmationEmailPayload
    >({
      query: (data) => ({
        url: "Authentication/resend-email-confirmation",
        method: "POST",
        body: data
      })
    }),
    getErrors: builder.query<GetErrorsResponse, GetErrorsPayload>({
      query: (data) => ({
        url: "CodeAnalytics/codeObjects/errors",
        params: {
          environment: data.environment,
          codeObjectId: data.codeObjectId
        }
      }),
      providesTags: ["Error"]
    }),
    getError: builder.query<GetErrorResponse, GetErrorPayload>({
      query: ({ id }) => ({
        url: `CodeAnalytics/codeObjects/errors/${window.encodeURIComponent(id)}`
      }),
      providesTags: ["Error"]
    }),
    getSpanInsight: builder.query<
      GetSpanInsightResponse,
      GetSpanInsightPayload
    >({
      query: (data) => ({
        url: "CodeAnalytics/codeObjects/insight",
        params: data
      }),
      providesTags: ["Insight"]
    }),
    getRecentActivity: builder.query<
      GetRecentActivityResponse,
      GetRecentActivityPayload
    >({
      query: (data) => ({
        url: "CodeAnalytics/codeObjects/recent_activity",
        method: "POST",
        body: data
      })
    }),
    getSpanCodeLocations: builder.query<
      GetSpanCodeLocationsResponse,
      GetSpanCodeLocationsPayload
    >({
      query: (data) => ({
        url: "CodeAnalytics/codeObjects/span_navigation",
        method: "POST",
        body: data
      })
    }),
    recheckInsight: builder.mutation<void, RecheckInsightPayload>({
      query: (data) => ({
        url: "CodeAnalytics/insights/start-time",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    getBlockedTraces: builder.query<
      GetBlockedTracesResponse,
      GetBlockedTracesPayload
    >({
      query: (data) => ({
        url: "Diagnostic/blocked-traces",
        method: "POST",
        body: data
      })
    }),
    getEnvironments: builder.query<GetEnvironmentsResponse, string | void>({
      query: () => "Environments",
      providesTags: ["Environment"]
    }),
    createEnvironment: builder.mutation<
      CreateEnvironmentResponse,
      CreateEnvironmentPayload
    >({
      query: (data) => ({
        url: "Environments",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Environment"]
    }),
    deleteEnvironment: builder.mutation<
      DeleteEnvironmentResponse,
      DeleteEnvironmentPayload
    >({
      query: ({ id }) => ({
        url: `Environments/${window.encodeURIComponent(id)}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Environment", "RecentActivity"]
    }),
    getErrorTimeseries: builder.query<
      GetErrorsTimeseriesResponse,
      GetErrorTimeseriesPayload
    >({
      query: ({ id, ...data }) => ({
        url: `errors/${window.encodeURIComponent(id)}/timeseries`,
        params: data
      })
    }),
    pinError: builder.mutation<void, PinErrorPayload>({
      query: ({ id }) => ({
        url: `errors/${window.encodeURIComponent(id)}/pin`,
        method: "POST"
      }),
      invalidatesTags: ["Error"]
    }),
    unpinError: builder.mutation<void, UnpinErrorPayload>({
      query: ({ id }) => ({
        url: `errors/${window.encodeURIComponent(id)}/unpin`,
        method: "POST"
      }),
      invalidatesTags: ["Error"]
    }),
    dismissError: builder.mutation<void, DismissErrorPayload>({
      query: ({ id }) => ({
        url: `errors/${window.encodeURIComponent(id)}/dismiss`,
        method: "POST"
      }),
      invalidatesTags: ["Error"]
    }),
    undismissError: builder.mutation<void, UndismissErrorPayload>({
      query: ({ id }) => ({
        url: `errors/${window.encodeURIComponent(id)}/undismiss`,
        method: "POST"
      }),
      invalidatesTags: ["Error"]
    }),
    getGlobalErrors: builder.query<
      GetGlobalErrorsResponse,
      GetGlobalErrorsPayload
    >({
      query: (data) => ({
        url: "Errors",
        method: "POST",
        body: data
      }),
      providesTags: ["Error"]
    }),
    getGlobalErrorFilters: builder.query<
      GetGlobalErrorsFiltersResponse,
      GetGlobalErrorsFiltersPayload
    >({
      query: (data) => ({
        url: "Errors/filters",
        method: "POST",
        body: data
      })
    }),
    getSpanPercentilesHistogram: builder.query<
      string,
      GetSpanPercentilesHistogramPayload
    >({
      query: (data) => ({
        url: "Graphs/graphForSpanPercentiles",
        method: "POST",
        body: data,
        responseHandler: "text"
      })
    }),
    getTopIssuesHighlights: builder.query<
      GetTopIssuesHighlightsResponse,
      GetTopIssuesHighlightsPayload
    >({
      query: (data) => ({
        url: "Highlights/topInsights",
        params: data
      })
    }),
    getTopIssuesHighlightsV2: builder.query<
      GetTopIssuesHighlightsResponse,
      GetTopIssuesHighlightsV2Payload
    >({
      query: (data) => ({
        url: "Highlights/topInsights",
        method: "POST",
        body: data
      })
    }),
    getPerformanceHighlights: builder.query<
      GetPerformanceHighlightsResponse,
      GetPerformanceHighlightsPayload
    >({
      query: (data) => ({
        url: "Highlights/performance",
        params: data
      })
    }),
    getPerformanceHighlightsV2: builder.query<
      GetPerformanceHighlightsResponse,
      GetPerformanceHighlightsPayload
    >({
      query: (data) => ({
        url: "Highlights/performance",
        method: "POST",
        body: data
      })
    }),
    getImpactHighlights: builder.query<
      GetImpactHighlightsResponse,
      GetImpactHighlightsPayload
    >({
      query: (data) => ({
        url: "Highlights/impact",
        method: "POST",
        body: data
      })
    }),
    getScalingHighlights: builder.query<
      GetScalingHighlightsResponse,
      GetScalingHighlightsPayload
    >({
      query: (data) => ({
        url: "Highlights/scaling",
        method: "POST",
        body: data
      })
    }),
    getInsights: builder.query<
      ExtendedGetInsightsResponse,
      ExtendedGetInsightsPayload
    >({
      query: ({ data }) => ({
        url: "Insights/get_insights_view",
        params: data
      }),
      transformResponse: (response: GetInsightsResponse, meta, arg) => ({
        data: response,
        extra: arg.extra
      }),
      providesTags: ["Insight"]
    }),
    getInsightsStats: builder.query<
      ExtendedGetInsightsStatsResponse,
      GetInsightsStatsPayload
    >({
      query: (data) => ({
        url: "Insights/statistics",
        params: data
      }),
      transformResponse: (response: GetInsightsStatsResponse, meta, arg) => ({
        data: response,
        extra: {
          spanCodeObjectId: arg.scopedSpanCodeObjectId
        }
      }),
      providesTags: ["Insight"]
    }),
    getIssues: builder.query<GetIssuesResponse, GetIssuesPayload>({
      query: (data) => ({ url: "Insights/issues", method: "POST", body: data }),
      providesTags: ["Insight"]
    }),
    getIssuesFilters: builder.query<
      GetIssuesFiltersResponse,
      GetIssuesFiltersPayload
    >({
      query: (data) => ({
        url: "Insights/issues/filters",
        params: data
      })
    }),
    markInsightRead: builder.mutation<void, MarkInsightReadPayload>({
      query: (data) => ({
        url: "Insights/markRead",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    markScopeInsightsRead: builder.mutation<void, MarkScopeInsightsReadPayload>(
      {
        query: (data) => ({
          url: "Insights/markAllRead",
          method: "POST",
          body: data
        }),
        invalidatesTags: ["Insight"]
      }
    ),
    linkTicketToIssue: builder.mutation<
      LinkTicketResponse,
      LinkTicketToIssuePayload
    >({
      query: (data) => ({
        url: "InsightsActions/link-ticket",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    unlinkTicketFromIssue: builder.mutation<
      LinkTicketResponse,
      UnlinkTicketFromIssuePayload
    >({
      query: (data) => ({
        url: "InsightsActions/unlink-ticket",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    dismissInsight: builder.mutation<void, DismissUndismissInsightPayload>({
      query: (data) => ({
        url: "InsightsActions/dismiss",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    undismissInsight: builder.mutation<void, DismissUndismissInsightPayload>({
      query: (data) => ({
        url: "InsightsActions/unDismiss",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Insight"]
    }),
    getServicesIssues: builder.query<
      SetMetricsReportDataPayload,
      GetMetricsReportDataPayloadV1 | GetMetricsReportDataPayloadV2
    >({
      query: (data) => ({
        url: "Reports/services/issues",
        method: "POST",
        body: data
      })
    }),
    getEndpointsIssues: builder.query<
      SetEndpointsIssuesPayload,
      GetEndpointsIssuesPayload
    >({
      query: (data) => ({
        url: "Reports/endpoints/issues",
        method: "POST",
        body: data
      })
    }),
    getEnvironmentServices: builder.query<
      GetEnvironmentServicesResponse,
      GetEnvironmentServicesPayload
    >({
      query: (data) => ({
        url: "Services/getServices",
        params: data
      })
    }),
    getServiceEndpoints: builder.query<
      SetServiceEndpointsPayload,
      GetServiceEndpointsPayload
    >({
      query: ({ service, environment }) => ({
        url: `Services/${window.encodeURIComponent(service)}/endpoints`,
        params: {
          environment
        }
      })
    }),
    getServiceEnvironments: builder.query<
      SetServiceEnvironmentsPayload,
      GetServiceEnvironmentsPayload
    >({
      query: ({ service }) =>
        `Services/${window.encodeURIComponent(service)}/environments`
    }),
    getSpanById: builder.query<GetSpanByIdResponse, GetSpanByIdPayload>({
      query: ({ id }) =>
        `Spans/spanCodeObjectId/${window.encodeURIComponent(id)}`
    }),
    getSpanInfo: builder.query<GetSpanInfoResponse, GetSpanInfoPayload>({
      query: (data) => ({
        url: "Spans/info",
        params: data
      })
    }),
    getSpanEnvironments: builder.query<
      ExtendedGetSpanEnvironmentsResponse,
      GetSpanEnvironmentsPayload
    >({
      query: (data) => ({
        url: "Spans/environments",
        params: data
      }),
      transformResponse: (
        response: GetSpanEnvironmentsResponse,
        meta,
        arg
      ) => ({
        data: response,
        extra: {
          spanCodeObjectId: arg.spanCodeObjectId
        }
      })
    }),
    getIssueRecommendations: builder.query<
      GetIssueRecommendationsResponse,
      GetIssueRecommendationsPayload
    >({
      query: (data) => ({
        url: "AI/issue",
        params: data
      })
    }),
    getIncidents: builder.query<GetIncidentsResponse, void>({
      query: () => ({
        url: "Agentic/incidents"
      })
    }),
    getIncident: builder.query<GetIncidentResponse, GetIncidentPayload>({
      query: ({ id }) => ({
        url: `Agentic/incidents/${window.encodeURIComponent(id)}`
      })
    }),
    getIncidentAgents: builder.query<
      GetIncidentAgentsResponse,
      GetIncidentAgentsPayload
    >({
      query: ({ id }) => ({
        url: `Agentic/incidents/${window.encodeURIComponent(id)}/agents`
      })
    }),
    getIncidentAgentEvents: builder.query<
      GetIncidentAgentEventsResponse,
      GetIncidentAgentEventsPayload
    >({
      query: ({ incidentId, agentId }) => ({
        url: `Agentic/incidents/${window.encodeURIComponent(
          incidentId
        )}/agents/${window.encodeURIComponent(agentId)}/events`
      })
    })
  })
});

export const {
  useGetAboutQuery,
  useGetAssetsCategoriesQuery,
  useGetAssetsFiltersQuery,
  useGetAssetsQuery,
  useGetUserProfileQuery,
  useResendConfirmationEmailMutation,
  useGetBlockedTracesQuery,
  useGetErrorsQuery,
  useGetErrorQuery,
  useGetGlobalErrorsQuery,
  useGetGlobalErrorFiltersQuery,
  useGetErrorTimeseriesQuery,
  usePinErrorMutation,
  useUnpinErrorMutation,
  useDismissErrorMutation,
  useUndismissErrorMutation,
  useGetSpanInsightQuery,
  useGetRecentActivityQuery,
  useGetSpanCodeLocationsQuery,
  useRecheckInsightMutation,
  useGetEnvironmentsQuery,
  useCreateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useLazyGetSpanPercentilesHistogramQuery,
  useGetTopIssuesHighlightsQuery,
  useGetTopIssuesHighlightsV2Query,
  useGetPerformanceHighlightsQuery,
  useGetPerformanceHighlightsV2Query,
  useGetImpactHighlightsQuery,
  useGetScalingHighlightsQuery,
  useGetInsightsQuery,
  useGetInsightsStatsQuery,
  useGetIssuesQuery,
  useGetIssuesFiltersQuery,
  useMarkInsightReadMutation,
  useMarkScopeInsightsReadMutation,
  useLinkTicketToIssueMutation,
  useUnlinkTicketFromIssueMutation,
  useDismissInsightMutation,
  useUndismissInsightMutation,
  useGetServicesIssuesQuery,
  useGetEndpointsIssuesQuery,
  useGetEnvironmentServicesQuery,
  useGetServiceEndpointsQuery,
  useGetServiceEnvironmentsQuery,
  useGetSpanByIdQuery,
  useGetSpanInfoQuery,
  useGetSpanEnvironmentsQuery,
  useGetIssueRecommendationsQuery,
  useGetIncidentsQuery,
  useGetIncidentQuery,
  useGetIncidentAgentsQuery,
  useGetIncidentAgentEventsQuery
} = digmaApi;
