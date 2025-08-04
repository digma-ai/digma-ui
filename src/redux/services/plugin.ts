import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serializeParams } from "./serializeParams";

export const pluginApi = createApi({
  reducerPath: "pluginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/plugin-api",
    credentials: "same-origin",
    paramsSerializer: serializeParams
  }),
  endpoints: () => ({})
});

// eslint-disable-next-line no-empty-pattern
export const {} = pluginApi;
