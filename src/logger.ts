import { Logger } from "./logging/Logger";
import { LOG_LEVEL } from "./logging/types";

export const logger = new Logger(
  window.isLoggingEnabled === true ? LOG_LEVEL.DEBUG : LOG_LEVEL.NONE
);
