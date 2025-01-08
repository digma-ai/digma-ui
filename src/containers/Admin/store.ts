import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../../redux/services/auth";
import { digmaApi } from "../../redux/services/digma";
import codeIssuesReportSlice from "../../redux/slices/codeIssuesReportSlice";

export const store = configureStore({
  reducer: {
    codeIssuesReport: codeIssuesReportSlice,
    [authApi.reducerPath]: authApi.reducer,
    [digmaApi.reducerPath]: digmaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(digmaApi.middleware)
      .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export type AdminRootState = ReturnType<typeof store.getState>;
export type AdminDispatch = typeof store.dispatch;
