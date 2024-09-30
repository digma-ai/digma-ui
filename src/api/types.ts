export type ActionListener = (
  data: unknown,
  timeStamp: number,
  error?: DigmaMessageError
) => void;

export interface DigmaMessageError {
  message: string;
}

export interface DigmaIncomingMessageData {
  type: "digma";
  action: string;
  payload?: unknown;
  error?: DigmaMessageError;
}

export interface DigmaOutgoingMessageData<T> {
  action: string;
  payload?: T;
}

export type DigmaMessageEvent = MessageEvent<DigmaIncomingMessageData>;
