import { createSlice } from "zustand-slices";
import { Scope } from "../../../components/common/App/types";

interface ScopeState {
  scope: Scope | null;
}

const initialState: ScopeState = {
  scope: null
};

interface ScopeActions {
  setScope: (scope: Scope) => void;
}

export type ScopeSlice = ScopeActions & ScopeState;

export const createScopeSlice = () =>
  createSlice({
    name: "scope",
    value: initialState,
    actions: {
      setScope: (scope: Scope) => (state) => {
        return state.scope?.span?.spanCodeObjectId !==
          scope.span?.spanCodeObjectId
          ? { ...state, scope, page: 0, search: "" }
          : state;
      }
    }
  });
