import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface IncidentsState extends BaseState {
  incidentId: string | null;
  agentId?: string | null;
}

const initialState: IncidentsState = {
  version: STATE_VERSION,
  incidentId: null,
  agentId: null
};

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIncidentId: (state, action: PayloadAction<string | null>) => {
      state.incidentId = action.payload;
    },
    setAgentId: (state, action: PayloadAction<string | null>) => {
      state.agentId = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setIncidentId, setAgentId, clear } = incidentsSlice.actions;

export default incidentsSlice.reducer;
