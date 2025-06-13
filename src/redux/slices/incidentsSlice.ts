import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface IncidentsState extends BaseState {
  isCreateIncidentChatOpen: boolean;
}

const initialState: IncidentsState = {
  version: STATE_VERSION,
  isCreateIncidentChatOpen: false
};

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIsCreateIncidentChatOpen: (state, action: { payload: boolean }) => {
      state.isCreateIncidentChatOpen = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setIsCreateIncidentChatOpen, clear } = incidentsSlice.actions;

export default incidentsSlice.reducer;
