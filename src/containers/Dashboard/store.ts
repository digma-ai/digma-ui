import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { digmaApi } from "../../redux/services/digma";
import issuesReportSlice from "../../redux/slices/issuesReportSlice";

export const store = configureStore({
  reducer: {
    metricsReport: issuesReportSlice,
    [digmaApi.reducerPath]: digmaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digmaApi.middleware)
});

setupListeners(store.dispatch);

export type DashboardRootState = ReturnType<typeof store.getState>;
export type DashboardDispatch = typeof store.dispatch;
