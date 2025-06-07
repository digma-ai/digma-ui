import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { initialState as configInitialState } from "../../components/common/App/ConfigContext";
import type {
  BackendInfo,
  ConfigContextData
} from "../../components/common/App/types";
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
  backend: GetAboutResponse | BackendInfo | null;
  environments: GetEnvironmentsResponse | null;
  config: ConfigContextData;
}

const initialState: AppState = {
  version: STATE_VERSION,
  isInitialized: false,
  backend: null,
  environments: null,
  config: configInitialState
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setBackend: (
      state,
      action: PayloadAction<GetAboutResponse | BackendInfo | null>
    ) => {
      state.backend = action.payload;
    },
    setEnvironments: (
      state,
      action: PayloadAction<GetEnvironmentsResponse | null>
    ) => {
      state.environments = action.payload;
    },
    setConfig: (state, action: PayloadAction<ConfigContextData>) => {
      state.config = action.payload;
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

export const {
  setIsInitialized,
  setBackend,
  setEnvironments,
  setConfig,
  clear
} = appSlice.actions;

export const useAppSelector = <TSelected, TRootState extends { app: AppState }>(
  selector: (state: AppState) => TSelected
) => useSelector<TRootState, TSelected>((state) => selector(state.app));
