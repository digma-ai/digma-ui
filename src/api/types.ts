export type ActionListener = (data: unknown, timeStamp: number) => void;

export interface DigmaIncomingMessageData {
  type: "digma";
  id?: string;
  action: string;
  payload?: unknown;
}

export interface DigmaOutgoingMessageData<T> {
  action: string;
  payload?: T;
}

export interface ExtendedDigmaOutgoingMessageData<T>
  extends DigmaOutgoingMessageData<T> {
  id: string;
}

export type DigmaMessageEvent = MessageEvent<DigmaIncomingMessageData>;
