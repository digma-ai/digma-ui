import { Logger } from "./Logger";
import { LOG_LEVEL } from "./types";

export class TaggedLogger {
  private logger: Logger;
  private tag: string;

  constructor(logger: Logger, tag: string) {
    this.logger = logger;
    this.tag = tag;
  }

  public log(
    level: LOG_LEVEL,
    message?: unknown,
    ...optionalParams: unknown[]
  ): void {
    this.logger.log(level, [this.tag], message, ...optionalParams);
  }

  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.DEBUG, message, ...optionalParams);
  }

  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.INFO, message, ...optionalParams);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.WARN, message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.ERROR, message, ...optionalParams);
  }
}
