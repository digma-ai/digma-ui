import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/auth/", credentials: "same-origin" }),
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
