import { View } from "./types";

export const isView = (view: string): view is View =>
  ["insights", "assets", "analytics", "tests"].includes(view);
