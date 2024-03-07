import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { actions } from "../../actions";
import { DismissInsightPayload, UndismissInsightPayload } from "../../types";
import { DismissResponsePayload, UndismissResponsePayload } from "./types";

export const useDismissalHandler = (insightId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleDismissed = (data: any) => {
      if (insightId === (data as DismissResponsePayload).insightId) {
        setIsLoading(false);
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
        setIsLoading(false);
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
  }, []);

  return {
    isLoading,
    dismiss: () => {
      window.sendMessageToDigma<DismissInsightPayload>({
        action: actions.DISMISS,
        payload: {
          insightId
        }
      });
      setIsLoading(true);
    },
    show: () => {
      window.sendMessageToDigma<UndismissInsightPayload>({
        action: actions.UNDISMISS,
        payload: {
          insightId: insightId
        }
      });
      setIsLoading(true);
    }
  };
};
