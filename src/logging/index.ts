import { Logger } from "./Logger";
import { LogLevel } from "./types";

export const logger = new Logger(
  window.isLoggingEnabled === true ? LogLevel.Debug : LogLevel.None
);
