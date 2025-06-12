import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import { digmaApi } from "../services/digma";
import type {
  GetAboutResponse,
  GetEnvironmentsResponse
} from "../services/types";
import type { BaseState } from "./types";

export interface AppState extends BaseState {
  isInitialized: boolean;
  backend: GetAboutResponse | null;
  environments: GetEnvironmentsResponse | null;
}

const initialState: AppState = {
  version: STATE_VERSION,
  isInitialized: false,
  backend: null,
  environments: null
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
    builder.addMatcher(
      digmaApi.endpoints.getAbout.matchFulfilled,
      (state, action) => {
        state.backend = action.payload;
      }
    );
    builder.addMatcher(
      digmaApi.endpoints.getEnvironments.matchFulfilled,
      (state, action) => {
        state.environments = action.payload;
      }
    );
  }
});

export const { setIsInitialized, clear } = appSlice.actions;
