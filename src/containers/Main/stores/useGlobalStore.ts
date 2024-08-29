import { useStore } from "./useStore";

export const useGlobalStore = () => {
  const state = useStore.getState();
  return state.global;
};
