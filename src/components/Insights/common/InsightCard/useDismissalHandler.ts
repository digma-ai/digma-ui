import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { actions } from "../../actions";
import { DismissInsightPayload, UndismissInsightPayload } from "../../types";
import { DismissedPayload, UndismissedPayload } from "./types";

export const useDismissalHandler = (insightId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleDismissed = (data: any) => {
      if (insightId === (data as DismissedPayload).insightId) {
        setIsLoading(false);
      }
    };

    dispatcher.addActionListener(actions.DISMISSED, handleDismissed);

    return () => {
      dispatcher.removeActionListener(actions.DISMISSED, handleDismissed);
    };
  }, []);

  useEffect(() => {
    const handleUndismissed = (data: any) => {
      if (insightId === (data as UndismissedPayload).insightId) {
        setIsLoading(false);
      }
    };

    dispatcher.addActionListener(actions.UNDISMISSED, handleUndismissed);

    return () => {
      dispatcher.removeActionListener(actions.UNDISMISSED, handleUndismissed);
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
