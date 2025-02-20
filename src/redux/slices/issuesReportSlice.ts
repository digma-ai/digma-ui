import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { isString } from "../../typeGuards/isString";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { EndpointData, IssueCriticality } from "../services/types";
import type { BaseState } from "./types";

export const DEFAULT_TIME_PERIOD_IN_DAYS = 7;

export type IssuesReportViewMode = "treemap" | "table";

export const isIssuesReportViewMode = (
  value: unknown
): value is IssuesReportViewMode =>
  isString(value) && ["treemap", "table"].includes(value);

export type IssuesReportTimeMode = "baseline" | "changes";

export const isIssuesReportTimeMode = (
  value: unknown
): value is IssuesReportTimeMode =>
  isString(value) && ["baseline", "changes"].includes(value);

export type IssuesReportViewLevel = "services" | "endpoints";

export const isIssuesReportViewLevel = (
  value: unknown
): value is IssuesReportViewLevel =>
  isString(value) && ["services", "endpoints"].includes(value);

export const isIssueCriticality = (value: unknown): value is IssueCriticality =>
  isString(value) && ["Low", "Medium", "High"].includes(value);

export interface IssuesReportState extends BaseState {
  viewMode: IssuesReportViewMode;
  timeMode: IssuesReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: IssueCriticality[];
  periodInDays: number;
  selectedEndpoints: EndpointData[];
  selectedServices: string[];
}

const initialState: IssuesReportState = {
  version: STATE_VERSION,
  viewMode: "treemap",
  timeMode: "baseline",
  selectedEnvironmentId: null,
  selectedService: null,
  criticalityLevels: ["Medium", "High"],
  periodInDays: DEFAULT_TIME_PERIOD_IN_DAYS,
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
    setSelectedEndpoints: (state, action: PayloadAction<EndpointData[]>) => {
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
