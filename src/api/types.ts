export type ActionListener = (data: unknown) => void;

export interface DigmaMessageEventData {
  type: "digma";
  action: string;
  payload?: unknown;
}

export type DigmaMessageEvent = MessageEvent<DigmaMessageEventData>;
