import { View } from "./types";

export const isView = (view: string): view is View =>
  ["insights", "assets", "tests"].includes(view);
