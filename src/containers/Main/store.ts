import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { digmaApi } from "../../redux/services/digma";

export const store = configureStore({
  reducer: {
    [digmaApi.reducerPath]: digmaApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digmaApi.middleware)
});

setupListeners(store.dispatch);

export type MainRootState = ReturnType<typeof store.getState>;
export type MainDispatch = typeof store.dispatch;
