import { format } from "date-fns";
import { LOG_LEVEL } from "./types";

export class Logger {
  private minLogLevel: number;
  private showTimeStamp: boolean;
  private showLogLevel: boolean;

  constructor(
    minLogLevel: LOG_LEVEL,
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
    return LOG_LEVEL[this.minLogLevel];
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

  public setLogLevel(logLevel: LOG_LEVEL): void {
    this.minLogLevel = logLevel;
  }

  public log(
    level: LOG_LEVEL,
    tags: string[],
    message?: unknown,
    ...optionalParams: unknown[]
  ): void {
    const formattedMessage = this.getFormattedMessage(tags, message);

    if (this.minLogLevel > level) {
      return;
    }

    switch (level) {
      case LOG_LEVEL.DEBUG:
        // eslint-disable-next-line no-console
        console.debug(formattedMessage, ...optionalParams);
        break;
      case LOG_LEVEL.INFO:
        // eslint-disable-next-line no-console
        console.info(formattedMessage, ...optionalParams);
        break;
      case LOG_LEVEL.WARN:
        // eslint-disable-next-line no-console
        console.warn(formattedMessage, ...optionalParams);
        break;
      case LOG_LEVEL.ERROR:
        // eslint-disable-next-line no-console
        console.error(formattedMessage, ...optionalParams);
        break;
      default:
        break;
    }
  }

  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.DEBUG, [], message, ...optionalParams);
  }

  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.INFO, [], message, ...optionalParams);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.WARN, [], message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LOG_LEVEL.ERROR, [], message, ...optionalParams);
  }
}
