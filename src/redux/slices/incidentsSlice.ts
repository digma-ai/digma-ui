import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface StatusDetails<T = unknown> {
  status: string;
  info: T;
}

export interface IncidentsState extends BaseState {
  isCreateIncidentChatOpen: boolean;
  incidentToCancel: string | null;
  incidentToClose: string | null;
  incidentToDelete: string | null;
  statusDetails: StatusDetails | null;
}

const initialState: IncidentsState = {
  version: STATE_VERSION,
  isCreateIncidentChatOpen: false,
  incidentToCancel: null,
  incidentToClose: null,
  incidentToDelete: null,
  statusDetails: null
};

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIsCreateIncidentChatOpen: (state, action: { payload: boolean }) => {
      state.isCreateIncidentChatOpen = action.payload;
    },
    setIncidentToCancel: (state, action: { payload: string | null }) => {
      state.incidentToCancel = action.payload;
    },
    setIncidentToClose: (state, action: { payload: string | null }) => {
      state.incidentToClose = action.payload;
    },
    setIncidentToDelete: (state, action: { payload: string | null }) => {
      state.incidentToDelete = action.payload;
    },
    setStatusDetails: (state, action: { payload: StatusDetails | null }) => {
      state.statusDetails = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const {
  setIsCreateIncidentChatOpen,
  setIncidentToCancel,
  setIncidentToClose,
  setIncidentToDelete,
  setStatusDetails,
  clear
} = incidentsSlice.actions;

export default incidentsSlice.reducer;
