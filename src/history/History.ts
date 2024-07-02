import { logger } from "../logging";
import { TaggedLogger } from "../logging/TaggedLogger";
import { isString } from "../typeGuards/isString";

export interface HistoryEntryLocation {
  pathname: string;
  search?: string;
}

export interface HistoryEntry<T> {
  location: HistoryEntryLocation;
  state?: T;
}

const MAX_SIZE = 15;

class History<T> {
  private maxSize: number;
  private logger = new TaggedLogger(logger, "HISTORY");
  public historyStack: HistoryEntry<T>[] = [];
  public currentIndex = -1;

  constructor(initialEntries: HistoryEntry<T>[] = [], maxSize = MAX_SIZE) {
    this.historyStack = initialEntries.slice(0, maxSize);
    this.currentIndex = initialEntries.length - 1;
    this.maxSize = maxSize;

    if (this.currentIndex >= 0) {
      this.emitEvent("change", this.historyStack[this.currentIndex]);
    }
  }

  private transformLocation(
    location: string | HistoryEntryLocation
  ): HistoryEntryLocation {
    return isString(location) ? { pathname: location } : location;
  }

  private emitEvent(name: string, detail?: unknown): void {
    const eventNamePrefix = "history:";
    const event = new CustomEvent(`${eventNamePrefix}${name}`, { detail });
    this.logger.debug(`Emitting "${name}" event: %O`, event);
    this.logger.debug("Stack: %O", this.historyStack);
    this.logger.debug("Current index: ", this.currentIndex);
    window.dispatchEvent(event);
  }

  public pushEntry(location: string | HistoryEntryLocation, state: T): void {
    // Remove forward history if we are not at the end of the stack
    if (this.currentIndex < this.historyStack.length - 1) {
      this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
    }

    // Push the new state
    this.historyStack.push({
      location: this.transformLocation(location),
      state
    });

    if (this.historyStack.length > this.maxSize) {
      this.historyStack.shift();
      this.currentIndex--;
    }

    this.currentIndex++;
    const entry = this.historyStack[this.currentIndex];
    this.logger.debug(
      `Pushing new entry at index ${this.currentIndex}: %O`,
      entry
    );
    this.emitEvent("change", entry);
  }

  public replaceEntry(location: string | HistoryEntryLocation, state: T): void {
    if (
      this.currentIndex >= 0 &&
      this.currentIndex < this.historyStack.length
    ) {
      this.historyStack[this.currentIndex] = {
        location: this.transformLocation(location),
        state
      };
      const entry = this.historyStack[this.currentIndex];
      this.logger.debug(
        `Replacing entry at index ${this.currentIndex}: %O`,
        entry
      );
      this.emitEvent("change", entry);
    }
  }

  public goBack(): void {
    if (this.canGoBack()) {
      this.currentIndex--;
      const entry = this.historyStack[this.currentIndex];
      this.logger.debug(
        `Going back to entry at index ${this.currentIndex}: %O`,
        entry
      );
      this.emitEvent("navigate", entry);
    }
  }

  public goForward(): void {
    if (this.canGoForward()) {
      this.currentIndex++;
      const entry = this.historyStack[this.currentIndex];
      this.logger.debug(
        `Going forward to entry at index ${this.currentIndex}: %O`,
        entry
      );
      this.emitEvent("navigate", entry);
    }
  }

  public go(index: number): void {
    const newIndex = this.currentIndex + index;
    if (newIndex >= 0 && newIndex < this.historyStack.length) {
      this.currentIndex = newIndex;
      const entry = this.historyStack[this.currentIndex];
      this.logger.debug(`Going to entry at index ${index}: %O`, entry);
      this.emitEvent("navigate", entry);
    }
  }

  public getCurrentLocation(): HistoryEntry<T> | null {
    if (
      this.currentIndex >= 0 &&
      this.currentIndex < this.historyStack.length
    ) {
      return this.historyStack[this.currentIndex];
    }
    return null;
  }

  public getEntryByIndex(index: number): HistoryEntry<T> | null {
    if (index >= 0 && index < this.historyStack.length) {
      return this.historyStack[index];
    }
    return null;
  }

  public clear(): void {
    this.historyStack = [];
    this.currentIndex = -1;
    this.logger.debug("Clearing history");
    this.emitEvent("clear");
  }

  public canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  public canGoForward(): boolean {
    return this.currentIndex < this.historyStack.length - 1;
  }

  public deleteEntryByIndex(index: number): void {
    if (index >= 0 && index < this.historyStack.length) {
      this.historyStack.splice(index, 1);
      if (this.currentIndex >= index) {
        this.currentIndex--;
      }
      // If currentIndex is still within range, update URL to new current entry
      if (
        this.currentIndex >= 0 &&
        this.currentIndex < this.historyStack.length
      ) {
        this.logger.debug(`Deleting entry at index ${index}: %O`, index);
        this.emitEvent("change", this.historyStack[this.currentIndex]);
      } else if (this.historyStack.length) {
        this.currentIndex = 0;
        this.emitEvent("change", this.historyStack[this.currentIndex]);
      } else {
        this.currentIndex = -1;
        this.emitEvent("clear");
      }
    }
  }
}

export default History;
