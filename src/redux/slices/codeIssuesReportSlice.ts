import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  Criticality,
  ReportTimeMode,
  ReportViewLevel,
  ReportViewMode
} from "../../components/Dashboard/MetricsReport/types";

export interface CodeIssuesReportState {
  viewMode: ReportViewMode;
  viewLevel: ReportViewLevel;
  timeMode: ReportTimeMode;
  selectedEnvironmentId: string | null;
  selectedService: string | null;
  criticalityLevels: Criticality[];
  periodInDays: number;
  selectedEndpoints: string[];
  selectedServices: string[];
}

const initialState: CodeIssuesReportState = {
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

export const codeIssuesReportSlice = createSlice({
  name: "codeIssuesReport",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ReportViewMode>) => {
      state.viewMode = action.payload;
    },
    setViewLevel: (state, action: PayloadAction<ReportViewLevel>) => {
      state.viewLevel = action.payload;
    },
    setTimeMode: (state, action: PayloadAction<ReportTimeMode>) => {
      state.timeMode = action.payload;
    },
    setSelectedEnvironmentId: (state, action: PayloadAction<string>) => {
      state.selectedEnvironmentId = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<string | null>) => {
      state.selectedService = action.payload;
    },
    setCriticalityLevels: (state, action: PayloadAction<Criticality[]>) => {
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
    }
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
  setSelectedServices
} = codeIssuesReportSlice.actions;

export default codeIssuesReportSlice.reducer;
