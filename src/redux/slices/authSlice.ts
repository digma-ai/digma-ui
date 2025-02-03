import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { globalClear } from "../actions";
import { STATE_VERSION } from "../constants";
import type { GetUserProfileResponse } from "../services/types";
import type { BaseState } from "./types";

export interface AuthState extends BaseState {
  user: GetUserProfileResponse | null;
}

const initialState: AuthState = {
  version: STATE_VERSION,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserProfileResponse | null>) => {
      state.user = action.payload;
    },
    clear: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(globalClear, () => initialState);
  }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
