import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serializeParams } from "./serializeParams";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/auth/",
    credentials: "same-origin",
    paramsSerializer: serializeParams
  }),
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST"
      })
    })
  })
});

export const { useLogoutMutation } = authApi;
