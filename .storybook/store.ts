import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { digmaApi } from "../src/redux/services/digma";

export const store = configureStore({
  reducer: {
    [digmaApi.reducerPath]: digmaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digmaApi.middleware)
});

setupListeners(store.dispatch);
