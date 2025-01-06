import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type GetEnvironmentsResponse } from "../../api/web/services/environments";
import type { GetServicesPayload } from "../../components/Dashboard/MetricsReport/Header/types";
import {
  type GetEndpointsIssuesPayload,
  type GetMetricsReportDataPayloadV2,
  type GetServiceEndpointsPayload,
  type GetServiceEnvironmentsPayload,
  type SetEndpointsIssuesPayload,
  type SetMetricsReportDataPayload,
  type SetServiceEndpointsPayload,
  type SetServiceEnvironmentsPayload
} from "../../components/Dashboard/MetricsReport/types";
import type { DeploymentType } from "../../components/common/App/types";

export const digmaApi = createApi({
  reducerPath: "digmaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/", credentials: "same-origin" }),
  endpoints: (builder) => ({
    getAbout: builder.query<
      {
        applicationVersion: string;
        deploymentType: DeploymentType;
        isCentralize: boolean;
        site: string;
      },
      void
    >({
      query: () => "about"
    }),
    getUserProfile: builder.query<
      {
        email: string;
      },
      void
    >({
      query: () => "authentication/logged-in-user"
    }),
    getEnvironments: builder.query<GetEnvironmentsResponse, void>({
      query: () => "environments"
    }),
    getServicesIssues: builder.query<
      SetMetricsReportDataPayload,
      GetMetricsReportDataPayloadV2
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
    getEnvironmentServices: builder.query<string[], GetServicesPayload>({
      query: ({ environment }) => ({
        url: "services/getServices",
        params: { environment }
      })
    }),
    getServiceEndpoints: builder.query<
      SetServiceEndpointsPayload,
      { service: string; data: GetServiceEndpointsPayload }
    >({
      query: ({ service, data }) => ({
        url: `services/${service}/endpoints`,
        method: "POST",
        body: data
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
