import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { BaseState } from "./types";

export interface AuthState extends BaseState {
  email: string | null;
}

const initialState: AuthState = {
  version: STATE_VERSION,
  email: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setEmail } = authSlice.actions;

export default authSlice.reducer;
