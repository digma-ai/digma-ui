import { actions } from "../actions";

export const saveToPersistence = <T extends Record<string, unknown>>(
  key: string,
  value: T,
  scope: "application" | "project"
) => {
  window.sendMessageToDigma({
    action: actions.SAVE_TO_PERSISTENCE,
    payload: {
      key,
      value,
      scope
    }
  });
};
