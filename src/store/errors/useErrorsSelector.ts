import { useStore } from "../useStore";

export const useErrorsSelector = () => {
  return useStore((state) => state.errors);
};
