import { useStore } from "../useStore";

export const useMetricsReportSelector = () =>
  useStore((state) => state.metricsReport);
