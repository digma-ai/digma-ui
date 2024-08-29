import { useStore } from "./useStore";

export const useScopeStore = () => {
  return useStore((state) => state.scope);
};
