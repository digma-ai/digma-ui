import { dispatcher } from "../dispatcher";

export const fetchData = async <T, K>(
  config: {
    requestAction: string;
    responseAction: string;
  },
  payload: T
) => {
  return new Promise<K>((resolve) => {
    window.sendMessageToDigma<T>({
      action: config.requestAction,
      payload
    });

    const handleResponse = (data: unknown) => {
      resolve(data as K);
      dispatcher.removeActionListener(config.responseAction, handleResponse);
    };

    dispatcher.addActionListener(config.responseAction, handleResponse);
  });
};
