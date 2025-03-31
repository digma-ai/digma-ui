import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  GenericCodeObjectInsight,
  InsightTicketInfo
} from "../../components/Insights/types";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface IssuesRepositoryState {
  insightInfoToOpenTicket: InsightTicketInfo<GenericCodeObjectInsight> | null;
  insightIdToOpenSuggestion: string | null;
}

export interface RepositoryState extends BaseState {
  issues: IssuesRepositoryState;
}

const initialState: RepositoryState = {
  version: STATE_VERSION,
  issues: {
    insightInfoToOpenTicket: null,
    insightIdToOpenSuggestion: null
  }
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setIssuesInsightInfoToOpenTicket: (
      state,
      action: PayloadAction<InsightTicketInfo<GenericCodeObjectInsight> | null>
    ) => {
      state.issues.insightInfoToOpenTicket = action.payload;
    },
    setIssuesInsightIdToOpenSuggestion: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.issues.insightIdToOpenSuggestion = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const {
  setIssuesInsightInfoToOpenTicket,
  setIssuesInsightIdToOpenSuggestion,
  clear
} = repositorySlice.actions;

export default repositorySlice.reducer;
