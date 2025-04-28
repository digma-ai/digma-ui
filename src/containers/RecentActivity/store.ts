import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { digmaApi } from "../../redux/services/digma";
import { pluginApi } from "../../redux/services/plugin";

export const store = configureStore({
  reducer: {
    [digmaApi.reducerPath]: digmaApi.reducer,
    [pluginApi.reducerPath]: pluginApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digmaApi.middleware, pluginApi.middleware)
});

setupListeners(store.dispatch);

export type RecentActivityRootState = ReturnType<typeof store.getState>;
export type RecentActivityDispatch = typeof store.dispatch;
