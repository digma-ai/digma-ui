import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rememberReducer } from "redux-remember";
import { platform } from "../../platform";
import { PERSIST_PREFIX, STATE_VERSION } from "../../redux/constants";
import { authApi } from "../../redux/services/auth";
import { digmaApi } from "../../redux/services/digma";
import { appSlice } from "../../redux/slices/appSlice";
import { authSlice } from "../../redux/slices/authSlice";
import issuesReportSlice from "../../redux/slices/issuesReportSlice";
import { persistSlice } from "../../redux/slices/persistSlice";
import { scopeSlice } from "../../redux/slices/scopeSlice";
import { getRememberEnhancer } from "../../redux/utils/getRememberEnhancer";
import { APP_ID } from "./constants";

const rememberedKeys =
  platform === "Web" ? ["auth", "codeIssuesReport", "persist"] : [];

const persistPrefix = `${PERSIST_PREFIX}${APP_ID}-`;

const reducer = rememberReducer({
  app: appSlice.reducer,
  scope: scopeSlice.reducer,
  auth: authSlice.reducer,
  codeIssuesReport: issuesReportSlice,
  persist: persistSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [digmaApi.reducerPath]: digmaApi.reducer
});

export const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      getRememberEnhancer({
        rememberedKeys,
        prefix: persistPrefix,
        version: STATE_VERSION
      })
    ),
  // TODO: Fix types
  // @ts-expect-error More info: https://github.com/zewish/redux-remember/issues/11
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digmaApi.middleware, authApi.middleware)
});

setupListeners(store.dispatch);

export type AdminRootState = ReturnType<typeof store.getState>;
export type AdminDispatch = typeof store.dispatch;
