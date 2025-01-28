import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface PersistState extends BaseState {
  isInsightJiraTicketHintShown: boolean;
}

const initialState: PersistState = {
  version: STATE_VERSION,
  isInsightJiraTicketHintShown: false
};

export const persistSlice = createSlice({
  name: "persist",
  initialState,
  reducers: {
    setIsInsightJiraTicketHintShown: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isInsightJiraTicketHintShown = action.payload;
    },
    clear: () => initialState
  }
});

export const { setIsInsightJiraTicketHintShown } = persistSlice.actions;

export default persistSlice.reducer;
