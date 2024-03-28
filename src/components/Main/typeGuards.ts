import { View } from "./types";

export const isView = (view: string): view is View =>
  ["highlights", "insights", "assets", "analytics", "tests"].includes(view);
