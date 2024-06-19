import { actions } from "../../actions";
import { ChangeScopePayload } from "../../types";

export const changeScope = (payload: ChangeScopePayload) => {
  window.sendMessageToDigma<ChangeScopePayload>({
    action: actions.CHANGE_SCOPE,
    payload
  });
};
