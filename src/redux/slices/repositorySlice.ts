import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Scope } from "../../components/common/App/types";
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
  scope: Scope | null;
}

const initialState: RepositoryState = {
  version: STATE_VERSION,
  issues: {
    insightInfoToOpenTicket: null,
    insightIdToOpenSuggestion: null
  },
  scope: null
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
    setScope: (state, action: PayloadAction<Scope>) => {
      state.scope = action.payload;
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
  setScope,
  clear
} = repositorySlice.actions;

export default repositorySlice.reducer;
