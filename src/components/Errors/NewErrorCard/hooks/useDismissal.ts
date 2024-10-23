import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { actions } from "../../actions";
import { DismissPayload, UndismissPayload } from "./types";

export const useDismissal = (id: string) => {
  const [isDismissalChangeInProgress, setIsDismissalChangeInProgress] =
    useState(false);

  useEffect(() => {
    const handleDismissed = (data: unknown) => {
      if (id === (data as DismissPayload).id) {
        setIsDismissalChangeInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_DISMISS_ERROR_RESULT,
      handleDismissed
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_DISMISS_ERROR_RESULT,
        handleDismissed
      );
    };
  }, [id]);

  useEffect(() => {
    const handleUndismissed = (data: unknown) => {
      if (id === (data as UndismissPayload).id) {
        setIsDismissalChangeInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_UNDISMISS_ERROR_RESULT,
      handleUndismissed
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_UNDISMISS_ERROR_RESULT,
        handleUndismissed
      );
    };
  }, [id]);

  return {
    isDismissalChangeInProgress,
    dismiss: () => {
      window.sendMessageToDigma<DismissPayload>({
        action: actions.DISMISS_ERROR,
        payload: {
          id
        }
      });
      setIsDismissalChangeInProgress(true);
    },
    show: () => {
      window.sendMessageToDigma<UndismissPayload>({
        action: actions.UNDISMISS_ERROR,
        payload: {
          id
        }
      });
      setIsDismissalChangeInProgress(true);
    }
  };
};
