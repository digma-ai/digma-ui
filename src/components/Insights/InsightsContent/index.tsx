import { useEffect, useState, type KeyboardEvent } from "react";
import { actions as globalActions } from "../../../actions";
import { usePrevious } from "../../../hooks/usePrevious";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import type { InsightsData } from "../../../store/insights/insightsSlice";
import { useInsightsSelector } from "../../../store/insights/useInsightsSelector";
import { RegistrationDialog } from "../../common/RegistrationDialog";
import type { RegistrationFormValues } from "../../common/RegistrationDialog/types";
import { EmptyState } from "../EmptyState";
import { InsightsCatalog } from "../InsightsCatalog";
import { InsightTicketRenderer } from "../InsightTicketRenderer";
import type { GenericCodeObjectInsight } from "../types";
import * as s from "./styles";
import type { InsightsContentProps } from "./types";

export const InsightsContent = ({
  onScopeChange,
  onGoToTab,
  data,
  isLoading,
  onRefresh,
  className,
  onOpenSuggestion,
  isJiraTicketHintEnabled,
  onJiraTicketPopupOpen,
  onJiraTicketPopupClose,
  infoToOpenJiraTicket
}: InsightsContentProps) => {
  const { backendInfo, userRegistrationEmail, environments } =
    useConfigSelector();
  const previousUserRegistrationEmail = usePrevious(userRegistrationEmail);
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const isRegistrationEnabled = false;
  const isRegistrationRequired =
    isRegistrationEnabled && !userRegistrationEmail;
  const { insightViewType } = useInsightsSelector();

  const handleJiraTicketPopupClose = () => {
    onJiraTicketPopupClose?.();
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
    onJiraTicketPopupClose?.();
  };

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onJiraTicketPopupClose?.();
    }
  };

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

  const renderContent = (
    data: InsightsData | null,
    isLoading: boolean
  ): JSX.Element => {
    const handleJiraTicketPopupOpen = (
      insight: GenericCodeObjectInsight,
      spanCodeObjectId?: string
    ) => {
      onJiraTicketPopupOpen?.(insight, spanCodeObjectId);
    };

    const isInitialLoading =
      (!data && isLoading) || !backendInfo || !insightViewType;

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
        onRefresh={onRefresh}
        onScopeChange={onScopeChange}
        onGoToTab={onGoToTab}
        onOpenSuggestion={onOpenSuggestion}
        isJiraTicketHintEnabled={Boolean(isJiraTicketHintEnabled)}
      />
    );
    // }
  };

  return (
    <s.Container className={className}>
      {renderContent(data, isLoading)}
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
