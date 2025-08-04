import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isString } from "../../typeGuards/isString";
import { serializeParams } from "./serializeParams";

export const digmaEmptyApi = createApi({
  reducerPath: "digmaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: isString(window.digmaApiProxyPrefix)
      ? window.digmaApiProxyPrefix
      : "/api/",
    credentials: "same-origin",
    paramsSerializer: serializeParams
  }),
  endpoints: () => ({})
});
