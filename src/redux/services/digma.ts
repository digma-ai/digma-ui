import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type GetEnvironmentsResponse } from "../../api/web/services/environments";
import type { GetServicesPayload } from "../../components/Dashboard/MetricsReport/Header/types";
import {
  type GetEndpointsIssuesPayload,
  type GetMetricsReportDataPayloadV1,
  type GetMetricsReportDataPayloadV2,
  type GetServiceEndpointsPayload,
  type GetServiceEnvironmentsPayload,
  type SetEndpointsIssuesPayload,
  type SetMetricsReportDataPayload,
  type SetServiceEndpointsPayload,
  type SetServiceEnvironmentsPayload
} from "../../components/Dashboard/MetricsReport/types";
import { isString } from "../../typeGuards/isString";
import type {
  GetAboutResponse,
  GetEnvironmentServicesResponse,
  GetUserProfileResponse
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
      GetServicesPayload
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
  useGetServiceEnvironmentsQuery
} = digmaApi;
