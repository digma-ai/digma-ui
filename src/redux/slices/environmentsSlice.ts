import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface EnvironmentsState extends BaseState {
  isSidebarOpen: boolean;
  environmentToDelete: string | null;
}

const initialState: EnvironmentsState = {
  version: STATE_VERSION,
  isSidebarOpen: false,
  environmentToDelete: null
};

export const environmentsSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setEnvironmentToDelete: (state, action: PayloadAction<string | null>) => {
      state.environmentToDelete = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setIsSidebarOpen, setEnvironmentToDelete, clear } =
  environmentsSlice.actions;

export default environmentsSlice.reducer;
