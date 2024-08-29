import { useStore } from "./useStore";

export const useGlobalStore = () => {
  return useStore((state) => state.global);
};
