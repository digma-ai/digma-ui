import { useState, type KeyboardEvent } from "react";
import { actions as globalActions } from "../../../actions";
import type { InsightsData } from "../../../store/insights/insightsSlice";
import { RegistrationDialog } from "../../common/RegistrationDialog";
import type { RegistrationFormValues } from "../../common/RegistrationDialog/types";
import { EmptyState } from "../EmptyState";
import { InsightsCatalog } from "../InsightsCatalog";
import { InsightTicketRenderer } from "../InsightTicketRenderer";
import type { GenericCodeObjectInsight, InsightTicketInfo } from "../types";
import * as s from "./styles";
import type { InsightsContentProps } from "./types";

export const InsightsContent = ({
  insightViewType,
  onScopeChange,
  onGoToTab,
  isTransitioning,
  backendInfo,
  environments,
  data,
  isLoading,
  onRefresh,
  isRegistrationEnabled,
  className
}: InsightsContentProps) => {
  const [infoToOpenJiraTicket, setInfoToOpenJiraTicket] =
    useState<InsightTicketInfo<GenericCodeObjectInsight>>();
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);

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

  const renderContent = (
    data: InsightsData | null,
    isLoading: boolean
  ): JSX.Element => {
    const handleJiraTicketPopupOpen = (
      insight: GenericCodeObjectInsight,
      spanCodeObjectId?: string
    ) => {
      setInfoToOpenJiraTicket({ insight, spanCodeObjectId });
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
            {isRegistrationEnabled ? (
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
