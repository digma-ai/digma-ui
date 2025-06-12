import { useCallback, useEffect, useState } from "react";
import { usePersistence } from "../../hooks/usePersistence";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { changeScope } from "../../utils/actions/changeScope";
import { useHistory } from "../Main/useHistory";
import { useInsightsData } from "./hooks/useInsightsData";
import { InsightsContent } from "./InsightsContent";
import type {
  GenericCodeObjectInsight,
  InsightTicketInfo,
  InsightsProps,
  isInsightJiraTicketHintShownPayload
} from "./types";

export const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const Insights = ({ insightViewType }: InsightsProps) => {
  const { data, isLoading, refresh } = useInsightsData();
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const { setInsightViewType, resetInsights: reset } = useStore.getState();
  const { goTo } = useHistory();
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );

  const isJiraTicketHintEnabled =
    !isUndefined(isInsightJiraTicketHintShown) &&
    !isInsightJiraTicketHintShown?.value;

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    setInsightViewType(insightViewType);
  }, [insightViewType, setInsightViewType]);

  const handleJiraTicketPopupOpen = useCallback(
    (insight: GenericCodeObjectInsight, spanCodeObjectId?: string) => {
      setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
      setIsInsightJiraTicketHintShown({ value: true });
    },
    [setIsInsightJiraTicketHintShown]
  );

  const handleJiraTicketPopupClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleGoToTab = (tabId: string) => {
    goTo(`/${tabId}`);
  };

  return (
    <InsightsContent
      onScopeChange={changeScope}
      onGoToTab={handleGoToTab}
      isLoading={isLoading}
      data={data}
      onRefresh={refresh}
      isJiraTicketHintEnabled={isJiraTicketHintEnabled}
      onJiraTicketPopupOpen={handleJiraTicketPopupOpen}
      onJiraTicketPopupClose={handleJiraTicketPopupClose}
      infoToOpenJiraTicket={infoToOpenJiraTicket}
    />
  );
};
