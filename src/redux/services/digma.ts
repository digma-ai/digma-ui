import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isString } from "../../typeGuards/isString";
import type {
  DismissUndismissInsightPayload,
  GetAboutResponse,
  GetEndpointsIssuesPayload,
  GetEnvironmentServicesPayload,
  GetEnvironmentServicesResponse,
  GetEnvironmentsResponse,
  GetInsightBySpanPayload,
  GetInsightBySpanResponse,
  GetIssuesPayload,
  GetIssuesResponse,
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  GetServiceEndpointsPayload,
  GetServiceEnvironmentsPayload,
  GetSpanPercentilesHistogramPayload,
  GetUserProfileResponse,
  LinkTicketResponse,
  LinkTicketToIssuePayload,
  MarkInsightAsReadPayload,
  SetEndpointsIssuesPayload,
  SetMetricsReportDataPayload,
  SetServiceEndpointsPayload,
  SetServiceEnvironmentsPayload,
  UnlinkTicketFromIssuePayload
} from "./types";

export const digmaApi = createApi({
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
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => "Authentication/logged-in-user"
    }),
    getInsightBySpan: builder.query<
      GetInsightBySpanResponse,
      GetInsightBySpanPayload
    >({
      query: (data) => ({
        url: "/CodeAnalytics/codeObjects/insight",
        params: data
      })
    }),
    getEnvironments: builder.query<GetEnvironmentsResponse, void>({
      query: () => "Environments"
    }),
    getSpanPercentilesHistogram: builder.query<
      string,
      GetSpanPercentilesHistogramPayload
    >({
      query: (data) => ({
        url: "/Graphs/graphForSpanPercentiles",
        method: "POST",
        body: data,
        responseHandler: "text"
      })
    }),
    markInsightAsRead: builder.mutation<void, MarkInsightAsReadPayload>({
      query: (data) => ({
        url: `Insights/markRead`,
        method: "POST",
        body: data
      })
    }),
    getIssues: builder.query<GetIssuesResponse, GetIssuesPayload>({
      query: (data) => ({ url: "Insights/issues", method: "POST", body: data })
    }),
    linkTicketToIssue: builder.mutation<
      LinkTicketResponse,
      LinkTicketToIssuePayload
    >({
      query: (data) => ({
        url: `/InsightsActions/link-ticket`,
        method: "PUT",
        body: data
      })
    }),
    unlinkTicketFromIssue: builder.mutation<
      LinkTicketResponse,
      UnlinkTicketFromIssuePayload
    >({
      query: (data) => ({
        url: `/InsightsActions/unlink-ticket`,
        method: "PUT",
        body: data
      })
    }),
    dismissInsight: builder.mutation<void, DismissUndismissInsightPayload>({
      query: (data) => ({
        url: `InsightsActions/dismiss`,
        method: "PUT",
        body: data
      })
    }),
    undismissInsight: builder.mutation<void, DismissUndismissInsightPayload>({
      query: (data) => ({
        url: `InsightsActions/unDismiss`,
        method: "PUT",
        body: data
      })
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
        url: `Services/${service}/endpoints`,
        params: {
          environment
        }
      })
    }),
    getServiceEnvironments: builder.query<
      SetServiceEnvironmentsPayload,
      GetServiceEnvironmentsPayload
    >({
      query: ({ service }) => `Services/${service}/environments`
    })
  })
});

export const {
  useGetAboutQuery,
  useGetUserProfileQuery,
  useGetInsightBySpanQuery,
  useGetEnvironmentsQuery,
  useLazyGetSpanPercentilesHistogramQuery,
  useMarkInsightAsReadMutation,
  useGetIssuesQuery,
  useLinkTicketToIssueMutation,
  useUnlinkTicketFromIssueMutation,
  useDismissInsightMutation,
  useUndismissInsightMutation,
  useGetServicesIssuesQuery,
  useGetEndpointsIssuesQuery,
  useGetEnvironmentServicesQuery,
  useGetServiceEndpointsQuery,
  useGetServiceEnvironmentsQuery
} = digmaApi;
