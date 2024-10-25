import { useAction } from "../../../../hooks/useAction";
import { Identifier } from "../../../../types";
import { actions } from "../../actions";
import { DismissPayload } from "./types";

export const useDismissal = (id: string) => {
  const { isOperationInProgress: isDismissInProgress, execute: dismiss } =
    useAction<Identifier, DismissPayload>(
      actions.DISMISS_ERROR,
      actions.SET_DISMISS_ERROR_RESULT,
      {
        id
      }
    );

  const { isOperationInProgress: isUndismissInProgress, execute: undismiss } =
    useAction<Identifier, DismissPayload>(
      actions.UNDISMISS_ERROR,
      actions.SET_UNDISMISS_ERROR_RESULT,
      {
        id
      }
    );

  return {
    dismiss,
    show: undismiss,
    isDismissalChangeInProgress: isDismissInProgress || isUndismissInProgress
  };
};
