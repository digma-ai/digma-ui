import type { Logger } from "./Logger";
import { LogLevel } from "./types";

export class TaggedLogger {
  private logger: Logger;
  private tag: string;

  constructor(logger: Logger, tag: string) {
    this.logger = logger;
    this.tag = tag;
  }

  public log(
    level: LogLevel,
    message?: unknown,
    ...optionalParams: unknown[]
  ): void {
    this.logger.log(level, [this.tag], message, ...optionalParams);
  }

  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Debug, message, ...optionalParams);
  }

  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Info, message, ...optionalParams);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Warn, message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Error, message, ...optionalParams);
  }
}
