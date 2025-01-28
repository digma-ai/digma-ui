import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface ScopeState extends BaseState {
  environmentId: string | null;
}

const initialState: ScopeState = {
  version: STATE_VERSION,
  environmentId: null
};

export const scopeSlice = createSlice({
  name: "scope",
  initialState,
  reducers: {
    setEnvironmentId: (state, action: PayloadAction<string | null>) => {
      state.environmentId = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setEnvironmentId } = scopeSlice.actions;

export default scopeSlice.reducer;
