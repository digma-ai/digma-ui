import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pluginApi = createApi({
  reducerPath: "pluginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/plugin-api",
    credentials: "same-origin"
  }),
  endpoints: () => ({})
});

// eslint-disable-next-line no-empty-pattern
export const {} = pluginApi;
