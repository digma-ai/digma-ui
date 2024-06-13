import { ActionListener } from "./types";

export class ActionDispatcher {
  private actions: Record<string, ActionListener[]>;
  constructor() {
    this.actions = {};
  }

  public addActionListener(type: string, listener: ActionListener) {
    if (!this.actions[type]) {
      this.actions[type] = [listener];
    } else {
      this.actions[type].push(listener);
    }
  }

  public removeActionListener(type: string, listener: ActionListener) {
    if (this.actions[type]) {
      this.actions[type] = this.actions[type].filter((x) => x !== listener);
    }

    if (this.actions[type].length === 0) {
      delete this.actions[type];
    }
  }

  public dispatch(timeStamp: number, type: string, data?: unknown): void {
    if (this.actions[type]) {
      this.actions[type].forEach((fn) => fn(data, timeStamp));
    }
  }
}
