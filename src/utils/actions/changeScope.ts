import { actions } from "../../actions";

export interface ChangeScopePayload {
  span: {
    spanCodeObjectId: string;
  } | null;
  environmentId?: string;
  openMainPanel?: boolean;
  context?: {
    event: string;
    payload?: Record<string, unknown>;
  };
}

export const changeScope = (payload: ChangeScopePayload) => {
  window.sendMessageToDigma<ChangeScopePayload>({
    action: actions.CHANGE_SCOPE,
    payload
  });
};
