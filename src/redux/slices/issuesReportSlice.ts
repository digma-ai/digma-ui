import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { IssueCriticality } from "../services/types";
import type { BaseState } from "./types";

export type IssuesReportViewMode = "treemap" | "table";

export type IssuesReportTimeMode = "baseline" | "changes";

export type IssuesReportViewLevel = "services" | "endpoints";

export interface IssuesReportState extends BaseState {
  viewMode: IssuesReportViewMode;
  viewLevel: IssuesReportViewLevel;
  timeMode: IssuesReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: IssueCriticality[];
  periodInDays: number;
  selectedEndpoints: string[];
  selectedServices: string[];
}

const initialState: IssuesReportState = {
  version: STATE_VERSION,
  viewMode: "treemap",
  viewLevel: "services",
  timeMode: "baseline",
  selectedEnvironmentId: null,
  selectedService: null,
  criticalityLevels: ["Medium", "High"],
  periodInDays: 7,
  selectedEndpoints: [],
  selectedServices: []
};

export const issuesReportSlice = createSlice({
  name: "issuesReport",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<IssuesReportViewMode>) => {
      state.viewMode = action.payload;
    },
    setViewLevel: (state, action: PayloadAction<IssuesReportViewLevel>) => {
      state.viewLevel = action.payload;
    },
    setTimeMode: (state, action: PayloadAction<IssuesReportTimeMode>) => {
      state.timeMode = action.payload;
    },
    setSelectedEnvironmentId: (state, action: PayloadAction<string>) => {
      state.selectedEnvironmentId = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<string | null>) => {
      state.selectedService = action.payload;
    },
    setCriticalityLevels: (
      state,
      action: PayloadAction<IssueCriticality[]>
    ) => {
      state.criticalityLevels = action.payload;
    },
    setPeriodInDays: (state, action: PayloadAction<number>) => {
      state.periodInDays = action.payload;
    },
    setSelectedEndpoints: (state, action: PayloadAction<string[]>) => {
      state.selectedEndpoints = action.payload;
    },
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const {
  setViewMode,
  setViewLevel,
  setTimeMode,
  setSelectedEnvironmentId,
  setSelectedService,
  setCriticalityLevels,
  setPeriodInDays,
  setSelectedEndpoints,
  setSelectedServices,
  clear
} = issuesReportSlice.actions;

export default issuesReportSlice.reducer;
