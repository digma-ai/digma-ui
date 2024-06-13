import { isString } from "../../typeGuards/isString";
import { NotificationsViewMode } from "./types";

export const isNotificationsViewMode = (
  viewMode: unknown
): viewMode is NotificationsViewMode => {
  return isString(viewMode) && ["popup", "full"].includes(viewMode);
};
