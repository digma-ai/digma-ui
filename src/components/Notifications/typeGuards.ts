import { isString } from "../../typeGuards/isString";
import type { NotificationsViewMode } from "./types";

export const isNotificationsViewMode = (
  viewMode: unknown
): viewMode is NotificationsViewMode => {
  return isString(viewMode) && ["popup", "full"].includes(viewMode);
};
