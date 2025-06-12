import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { actions as globalActions } from "../../actions";
import { usePersistence } from "../../hooks/usePersistence";
import { usePrevious } from "../../hooks/usePrevious";
import { useConfigSelector } from "../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../store/insights/useInsightsSelector";
import { useStore } from "../../store/useStore";
import { isUndefined } from "../../typeGuards/isUndefined";
import { changeScope } from "../../utils/actions/changeScope";
import { RegistrationDialog } from "../common/RegistrationDialog";
import type { RegistrationFormValues } from "../common/RegistrationDialog/types";
import { useHistory } from "../Main/useHistory";
import { EmptyState } from "./EmptyState";
import { useInsightsData } from "./hooks/useInsightsData";
import { InsightsCatalog } from "./InsightsCatalog";
import { InsightTicketRenderer } from "./InsightTicketRenderer";
import * as s from "./styles";
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
  const { backendInfo, userRegistrationEmail, environments } =
    useConfigSelector();
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !userRegistrationEmail;
  const { setInsightViewType, resetInsights: reset } = useStore.getState();
  const { insightViewType: storedInsightViewType } = useInsightsSelector();
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

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

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

  const handleRegistrationSubmit = (formData: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: globalActions.PERSONALIZE_REGISTER,
      payload: {
        ...formData,
        scope: "insights view jira ticket info"
      }
    });

    setIsRegistrationInProgress(true);
  };

  const handleRegistrationDialogClose = () => {
    setInfoToOpenJiraTicket(undefined);
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setInfoToOpenJiraTicket(undefined);
    }
  };

  const renderContent = (): JSX.Element => {
    const isInitialLoading =
      (!data && isLoading) || !backendInfo || !storedInsightViewType;

    const handleGoToTab = (tabId: string) => {
      goTo(`/${tabId}`);
    };

    if (isInitialLoading) {
      return <EmptyState preset={"loading"} />;
    }

    if (!environments?.length) {
      return <EmptyState preset={"noDataYet"} />;
    }

    // switch (data?.insightsStatus) {
    //   case InsightsStatus.STARTUP:
    //     return <EmptyState preset={"nothingToShow"} />;
    //   case InsightsStatus.NO_INSIGHTS:
    //     return <EmptyState preset={"noInsights"} />;
    //   case InsightsStatus.INSIGHT_PENDING:
    //     return <EmptyState preset={"processing"} />;
    //   case InsightsStatus.NO_SPANS_DATA:
    //     return <EmptyState preset={"noDataYet"} />;
    //   case InsightsStatus.NO_OBSERVABILITY:
    //     return <EmptyState preset={"noObservability"} />;
    //   case InsightsStatus.DEFAULT:
    //   default:
    return (
      <InsightsCatalog
        onJiraTicketCreate={handleJiraTicketPopupOpen}
        onRefresh={refresh}
        onGoToTab={handleGoToTab}
        onScopeChange={changeScope}
        isJiraTicketHintEnabled={isJiraTicketHintEnabled}
      />
    );
    // }
  };

  return (
    <s.Container>
      {renderContent()}
      {infoToOpenJiraTicket && (
        <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={-1}>
          <s.PopupContainer>
            {isRegistrationRequired ? (
              <RegistrationDialog
                onSubmit={handleRegistrationSubmit}
                onClose={handleRegistrationDialogClose}
                isRegistrationInProgress={isRegistrationInProgress}
              />
            ) : (
              <InsightTicketRenderer
                data={infoToOpenJiraTicket}
                onClose={handleJiraTicketPopupClose}
                backendInfo={backendInfo}
              />
            )}
          </s.PopupContainer>
        </s.Overlay>
      )}
    </s.Container>
  );
};
