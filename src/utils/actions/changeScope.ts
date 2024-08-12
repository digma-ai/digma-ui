import { actions } from "../../actions";
import { useGlobalStore } from "../../containers/Main/stores/useGlobalStore";
import { useInsightsStore } from "../../containers/Main/stores/useInsightsStore";

interface ChangeScopePayload {
  span: {
    spanCodeObjectId: string;
  } | null;
  environmentId?: string;
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
  useGlobalStore.getState().setIsScopeLoading(true);
  useInsightsStore.getState().setData(null);
};
