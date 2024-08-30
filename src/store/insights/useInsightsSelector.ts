import { useStore } from "../useStore";

export const useInsightsSelector = () => useStore((state) => state.insights);
