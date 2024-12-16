import type { Duration } from "../globals";

export const getDurationString = (duration: Duration) =>
  `${duration.value} ${duration.unit}`;
