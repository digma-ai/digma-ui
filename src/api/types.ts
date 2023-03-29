export type ActionListener = (data: unknown) => void;

export interface DigmaIncomingMessageData {
  type: "digma";
  action: string;
  payload?: unknown;
}

export interface DigmaOutgoingMessageData {
  action: string;
  payload?: Record<string, unknown>;
}

export type DigmaMessageEvent = MessageEvent<DigmaIncomingMessageData>;
