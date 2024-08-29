import { useStore } from "./useStore";

export const useScopeStore = () => {
  const state = useStore.getState();
  return state.scope;
};
