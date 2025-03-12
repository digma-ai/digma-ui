import { format } from "date-fns";
import { LogLevel } from "./types";

export class Logger {
  private minLogLevel: LogLevel;
  private showTimeStamp: boolean;
  private showLogLevel: boolean;

  constructor(
    minLogLevel: LogLevel,
    showTimeStamp = true,
    showLogLevel = true
  ) {
    this.minLogLevel = minLogLevel;
    this.showTimeStamp = showTimeStamp;
    this.showLogLevel = showLogLevel;
  }

  private getTimestampTag(): string {
    return format(new Date(), "HH:mm:ss");
  }

  private getLogLevelTag(): string {
    return LogLevel[this.minLogLevel];
  }

  private getFormattedMessage(tags: string[], message: unknown): string {
    if (this.showLogLevel) {
      tags.unshift(this.getLogLevelTag());
    }

    if (this.showTimeStamp) {
      tags.unshift(this.getTimestampTag());
    }

    const tagsString = tags.map((x) => `[${x}]`).join("");

    return `${tagsString}: ${message as string}`;
  }

  public setLogLevel(logLevel: LogLevel): void {
    this.minLogLevel = logLevel;
  }

  public log(
    level: LogLevel,
    tags: string[],
    message?: unknown,
    ...optionalParams: unknown[]
  ): void {
    const formattedMessage = this.getFormattedMessage(tags, message);

    if (this.minLogLevel > level) {
      return;
    }

    switch (level) {
      case LogLevel.Debug:
        // eslint-disable-next-line no-console
        console.debug(formattedMessage, ...optionalParams);
        break;
      case LogLevel.Info:
        // eslint-disable-next-line no-console
        console.info(formattedMessage, ...optionalParams);
        break;
      case LogLevel.Warn:
        // eslint-disable-next-line no-console
        console.warn(formattedMessage, ...optionalParams);
        break;
      case LogLevel.Error:
        // eslint-disable-next-line no-console
        console.error(formattedMessage, ...optionalParams);
        break;
      default:
        break;
    }
  }

  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Debug, [], message, ...optionalParams);
  }

  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Info, [], message, ...optionalParams);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Warn, [], message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.Error, [], message, ...optionalParams);
  }
}
