import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LinkTicketResponse } from "../../components/Insights/insightTickets/common/InsightJiraTicket/types";
import { isString } from "../../typeGuards/isString";
import type {
  DismissUndismissInsightPayload,
  GetAboutResponse,
  GetEndpointsIssuesPayload,
  GetEnvironmentServicesPayload,
  GetEnvironmentServicesResponse,
  GetEnvironmentsResponse,
  GetIssuesPayload,
  GetIssuesResponse,
  GetMetricsReportDataPayloadV1,
  GetMetricsReportDataPayloadV2,
  GetServiceEndpointsPayload,
  GetServiceEnvironmentsPayload,
  GetUserProfileResponse,
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
      query: () => "about"
    }),
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => "authentication/logged-in-user"
    }),
    getEnvironments: builder.query<GetEnvironmentsResponse, void>({
      query: () => "environments"
    }),
    getServicesIssues: builder.query<
      SetMetricsReportDataPayload,
      GetMetricsReportDataPayloadV1 | GetMetricsReportDataPayloadV2
    >({
      query: (data) => ({
        url: "reports/services/issues",
        method: "POST",
        body: data
      })
    }),
    getEndpointsIssues: builder.query<
      SetEndpointsIssuesPayload,
      GetEndpointsIssuesPayload
    >({
      query: (data) => ({
        url: "reports/endpoints/issues",
        method: "POST",
        body: data
      })
    }),
    getEnvironmentServices: builder.query<
      GetEnvironmentServicesResponse,
      GetEnvironmentServicesPayload
    >({
      query: (data) => ({
        url: "services/getServices",
        params: data
      })
    }),
    getServiceEndpoints: builder.query<
      SetServiceEndpointsPayload,
      GetServiceEndpointsPayload
    >({
      query: ({ service, environment }) => ({
        url: `services/${service}/endpoints`,
        params: {
          environment
        }
      })
    }),
    getServiceEnvironments: builder.query<
      SetServiceEnvironmentsPayload,
      GetServiceEnvironmentsPayload
    >({
      query: ({ service }) => `services/${service}/environments`
    }),
    getIssues: builder.query<GetIssuesResponse, GetIssuesPayload>({
      query: (data) => ({ url: "insights/issues", method: "POST", body: data })
    }),
    markInsightAsRead: builder.mutation<void, MarkInsightAsReadPayload>({
      query: (data) => ({
        url: `Insights/markRead`,
        method: "POST",
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
    })
  })
});

export const {
  useGetAboutQuery,
  useGetUserProfileQuery,
  useGetEnvironmentsQuery,
  useGetServicesIssuesQuery,
  useGetEndpointsIssuesQuery,
  useGetEnvironmentServicesQuery,
  useGetServiceEndpointsQuery,
  useGetServiceEnvironmentsQuery,
  useGetIssuesQuery,
  useMarkInsightAsReadMutation,
  useDismissInsightMutation,
  useUndismissInsightMutation,
  useLinkTicketToIssueMutation,
  useUnlinkTicketFromIssueMutation
} = digmaApi;
