import { Logger } from "./Logger";
import { LOG_LEVEL } from "./types";

export const logger = new Logger(
  window.isLoggingEnabled === true ? LOG_LEVEL.DEBUG : LOG_LEVEL.NONE
);
