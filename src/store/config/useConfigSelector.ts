import { useStore } from "../useStore";

export const useConfigSelector = () => {
  return useStore((state) => state.config);
};
