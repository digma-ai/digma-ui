import type { Duration } from "../redux/services/types";

export const getDurationString = (duration: Duration) =>
  `${duration.value} ${duration.unit}`;
