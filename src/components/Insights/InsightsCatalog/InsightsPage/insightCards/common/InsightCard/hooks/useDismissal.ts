import { useAction } from "../../../../../../../../hooks/useAction";
import { actions } from "../../../../../../actions";
import { DismissUndismissInsightPayload } from "../../../../../../types";
import { DismissUndismissResponsePayload } from "../types";

const mapId = (response: DismissUndismissResponsePayload) => response.insightId;

export const useDismissal = (insightId: string) => {
  const { isOperationInProgress: isDismissInProgress, execute: dismiss } =
    useAction<DismissUndismissInsightPayload, DismissUndismissResponsePayload>(
      actions.DISMISS,
      actions.SET_DISMISS_RESPONSE,
      {
        id: insightId,
        insightId
      },
      mapId
    );

  const { isOperationInProgress: isUndismissInProgress, execute: undismiss } =
    useAction<DismissUndismissInsightPayload, DismissUndismissResponsePayload>(
      actions.UNDISMISS,
      actions.SET_UNDISMISS_RESPONSE,
      {
        id: insightId,
        insightId
      },
      mapId
    );
  return {
    dismiss,
    show: undismiss,
    isDismissalChangeInProgress: isDismissInProgress || isUndismissInProgress
  };
};
