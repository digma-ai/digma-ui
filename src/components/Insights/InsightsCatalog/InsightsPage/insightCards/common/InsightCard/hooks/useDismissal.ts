import { useEffect, useState } from "react";
import { dispatcher } from "../../../../../../../../dispatcher";
import { actions } from "../../../../../../actions";
import {
  DismissInsightPayload,
  UndismissInsightPayload
} from "../../../../../../types";
import { DismissResponsePayload, UndismissResponsePayload } from "../types";

export const useDismissal = (insightId: string) => {
  const [isDismissalChangeInProgress, setIsDismissalChangeInProgress] =
    useState(false);

  useEffect(() => {
    const handleDismissed = (data: any) => {
      if (insightId === (data as DismissResponsePayload).insightId) {
        setIsDismissalChangeInProgress(false);
      }
    };

    dispatcher.addActionListener(actions.SET_DISMISS_RESPONSE, handleDismissed);

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DISMISS_RESPONSE,
        handleDismissed
      );
    };
  }, []);

  useEffect(() => {
    const handleUndismissed = (data: any) => {
      if (insightId === (data as UndismissResponsePayload).insightId) {
        setIsDismissalChangeInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_UNDISMISS_RESPONSE,
      handleUndismissed
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_UNDISMISS_RESPONSE,
        handleUndismissed
      );
    };
  }, [insightId]);

  return {
    isDismissalChangeInProgress,
    dismiss: () => {
      window.sendMessageToDigma<DismissInsightPayload>({
        action: actions.DISMISS,
        payload: {
          insightId
        }
      });
      setIsDismissalChangeInProgress(true);
    },
    show: () => {
      window.sendMessageToDigma<UndismissInsightPayload>({
        action: actions.UNDISMISS,
        payload: {
          insightId: insightId
        }
      });
      setIsDismissalChangeInProgress(true);
    }
  };
};
