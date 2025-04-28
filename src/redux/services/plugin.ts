import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ToggleRecentIndicatorPayload {
  status: boolean;
}

export const pluginApi = createApi({
  reducerPath: "pluginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/plugin-api",
    credentials: "same-origin"
  }),
  endpoints: (builder) => ({
    toggleRecentIndicator: builder.mutation<void, ToggleRecentIndicatorPayload>(
      {
        query: (data) => ({
          url: "",
          params: {
            pluginCommand: "RecentActivityBadge"
          },
          method: "PUT",
          body: data
        })
      }
    )
  })
});

export const { useToggleRecentIndicatorMutation } = pluginApi;
