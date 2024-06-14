import { useEffect, useState } from "react";
import { dispatcher } from "../../../../../../../../dispatcher";
import { actions } from "../../../../../../actions";
import { MarkAsReadPayload, SetMarkAsReadResponsePayload } from "../types";

export const useMarkingAsRead = (insightId: string) => {
  const [isMarkingAsReadInProgress, setIsMarkingAsReadInProgress] =
    useState(false);

  const markAsRead = () => {
    window.sendMessageToDigma<MarkAsReadPayload>({
      action: actions.MARK_AS_READ,
      payload: {
        insightIds: [insightId]
      }
    });
    setIsMarkingAsReadInProgress(true);
  };

  useEffect(() => {
    const handleMarkAsReadResponse = (data: unknown) => {
      if (
        (data as SetMarkAsReadResponsePayload).insightIds.includes(insightId)
      ) {
        setIsMarkingAsReadInProgress(false);
      }
    };

    dispatcher.addActionListener(
      actions.SET_MARK_AS_READ_RESPONSE,
      handleMarkAsReadResponse
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_MARK_AS_READ_RESPONSE,
        handleMarkAsReadResponse
      );
    };
  }, [insightId]);

  return {
    isMarkingAsReadInProgress,
    markAsRead
  };
};
