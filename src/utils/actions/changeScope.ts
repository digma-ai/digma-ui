import { actions } from "../../actions";
import type { ScopeChangeEvent } from "../../types";

export interface ChangeScopePayload {
  span: {
    spanCodeObjectId: string;
  } | null;
  environmentId?: string;
  openMainPanel?: boolean;
  context?: {
    event: ScopeChangeEvent;
    payload?: Record<string, unknown>;
  };
}

export const changeScope = (payload: ChangeScopePayload) => {
  window.sendMessageToDigma<ChangeScopePayload>({
    action: actions.CHANGE_SCOPE,
    payload
  });
};
