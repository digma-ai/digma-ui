import { useEffect, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import type { ScopeSpan } from "../../common/App/types";
import { actions } from "../actions";
import type { MarkAllAsReadPayload } from "./InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/types";

export const useMarkingAllAsRead = (scope: ScopeSpan | null) => {
  const [isMarkingAllAsReadInProgress, setIsMarkingAllAsReadInProgress] =
    useState(false);

  const markAllAsRead = () => {
    window.sendMessageToDigma<MarkAllAsReadPayload>({
      action: actions.MARK_ALL_AS_READ,
      payload: {
        scope
      }
    });
    setIsMarkingAllAsReadInProgress(true);
  };

  useEffect(() => {
    const handleMarkAsReadResponse = () => {
      setIsMarkingAllAsReadInProgress(false);
    };

    dispatcher.addActionListener(
      actions.SET_MARK_ALL_AS_READ_RESPONSE,
      handleMarkAsReadResponse
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_MARK_ALL_AS_READ_RESPONSE,
        handleMarkAsReadResponse
      );
    };
  }, [scope]);

  return {
    isMarkingAllAsReadInProgress,
    markAllAsRead
  };
};
