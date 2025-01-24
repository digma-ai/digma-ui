import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface GlobalState extends BaseState {
  isInitialized: boolean;
}

const initialState: GlobalState = {
  version: STATE_VERSION,
  isInitialized: false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setIsInitialized } = appSlice.actions;

export default appSlice.reducer;
