import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IncidentsState extends BaseState {}

const initialState: IncidentsState = {
  version: STATE_VERSION
};

export const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { clear } = incidentsSlice.actions;

export default incidentsSlice.reducer;
