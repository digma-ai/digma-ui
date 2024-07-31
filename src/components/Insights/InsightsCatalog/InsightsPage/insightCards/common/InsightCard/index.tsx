import React, { useEffect, useState } from "react";
import { useGlobalStore } from "../../../../../../../containers/Main/stores/useGlobalStore";
import { usePrevious } from "../../../../../../../hooks/usePrevious";
import { isString } from "../../../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { Spinner } from "../../../../../../Navigation/CodeButtonMenu/Spinner";
import { CheckmarkCircleIcon } from "../../../../../../common/icons/12px/CheckmarkCircleIcon";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { DoubleCircleIcon } from "../../../../../../common/icons/16px/DoubleCircleIcon";
import { HistogramIcon } from "../../../../../../common/icons/16px/HistogramIcon";
import { PinIcon } from "../../../../../../common/icons/16px/PinIcon";
import { RecalculateIcon } from "../../../../../../common/icons/16px/RecalculateIcon";
import { CrossIcon } from "../../../../../../common/icons/CrossIcon";
import { Button } from "../../../../../../common/v3/Button";
import { BaseButtonProps } from "../../../../../../common/v3/Button/types";
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../typeGuards";
import { InsightStatus } from "../../../../../types";
import { InsightHeader } from "./InsightHeader";
import { ProductionAffectionBar } from "./ProductionAffectionBar";
import { RecalculateBar } from "./RecalculateBar";
import { useDismissal } from "./hooks/useDismissal";
import { useMarkingAsRead } from "./hooks/useMarkingAsRead";
import * as s from "./styles";
import { InsightCardProps } from "./types";

const HIGH_CRITICALITY_THRESHOLD = 0.8;

export const InsightCard = ({
  insight,
  onRefresh,
  onRecalculate,
  onOpenHistogram,
  onGoToSpan,
  onJiraButtonClick,
  jiraTicketInfo,
  isMarkAsReadButtonEnabled,
  onGoToTrace,
  onGoToLive,
  onPin,
  content,
  isAsync
}: InsightCardProps) => {
  const [isDismissConfirmationOpened, setDismissConfirmationOpened] =
    useState(false);
  const { isDismissalChangeInProgress, dismiss, show } = useDismissal(
    insight.id
  );
  const { isMarkingAsReadInProgress, markAsRead } = useMarkingAsRead(
    insight.id
  );
  const isOperationInProgress =
    isDismissalChangeInProgress || isMarkingAsReadInProgress;
  const previousIsOperationInProgress = usePrevious(isOperationInProgress);
  const isJaegerEnabled = useGlobalStore.use.isJaegerEnabled();
  const [insightStatus, setInsightStatus] = useState(insight.status);

  const isCritical = insight.criticality > HIGH_CRITICALITY_THRESHOLD;

  // TODO: remove and refresh the insight data
  useEffect(() => {
    setInsightStatus(insight.status);
  }, [insight.status]);

  useEffect(() => {
    if (previousIsOperationInProgress && !isOperationInProgress) {
      onRefresh(insight.type);
    }
  }, [
    previousIsOperationInProgress,
    isOperationInProgress,
    onRefresh,
    insight.type
  ]);

  const handleRecheckButtonClick = () => {
    if (onRecalculate) {
      onRecalculate(insight.id);
    }
    // TODO: handle Recheck response and refresh the insight data
    setInsightStatus(InsightStatus.InEvaluation);
  };

  const handleHistogramButtonClick = () => {
    if (isSpanInsight(insight) && insight.spanInfo && onOpenHistogram) {
      onOpenHistogram(
        insight.spanInfo.spanCodeObjectId,
        insight.type,
        insight.spanInfo.displayName
      );
    }
  };

  const getRecalculateVisibilityParams = () => {
    const areStartTimesEqual =
      insight.customStartTime &&
      insight.actualStartTime &&
      new Date(insight.actualStartTime).valueOf() -
        new Date(insight.customStartTime).valueOf() ===
        0;

    return {
      showTimer: areStartTimesEqual,
      showBanner: insightStatus === InsightStatus.InEvaluation
    };
  };

  const handleSpanLinkClick = () => {
    if (
      (isSpanInsight(insight) || isEndpointInsight(insight)) &&
      insight.spanInfo
    ) {
      onGoToSpan(insight.spanInfo.spanCodeObjectId);
    }
  };

  const handleDismissClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_DISMISS_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );
    dismiss();
    setDismissConfirmationOpened(false);
  };

  const handleShowClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_SHOW_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );
    show();
  };

  const handleMarkAsReadButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_MARK_AS_READ_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );
    markAsRead();
  };

  const openTicketInfo = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraButtonClick) {
      onJiraButtonClick(spanCodeObjectId, event);
    }
  };

  const handleCreateTicketLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_CREATE_TICKET_LINK_CLICKED,
      {
        insightType: insight.type
      }
    );
    openTicketInfo(
      jiraTicketInfo?.spanCodeObjectId,
      "create ticket link clicked"
    );
  };

  const handleClick = () => {
    if (
      !isMarkAsReadButtonEnabled &&
      insight.isReadable &&
      insight.isRead === false
    ) {
      markAsRead();
    }
  };

  const renderActions = () => {
    const buttonsToRender: {
      tooltip: string;
      button: React.ComponentType<BaseButtonProps>;
    }[] = [];

    if (
      isMarkAsReadButtonEnabled &&
      insight.isReadable &&
      insight.isRead === false
    ) {
      buttonsToRender.push({
        tooltip: "Mark as read",
        button: (btnProps) => (
          <Button
            icon={CheckmarkCircleIcon}
            label={"Mark as read"}
            onClick={handleMarkAsReadButtonClick}
            isDisabled={isMarkingAsReadInProgress}
            {...btnProps}
          />
        )
      });
    }

    if (onOpenHistogram) {
      buttonsToRender.push({
        tooltip: "Open Histogram",
        button: (btnProps) => (
          <Button
            icon={HistogramIcon}
            label={"Histogram"}
            onClick={handleHistogramButtonClick}
            {...btnProps}
          />
        )
      });
    }

    if (insight.isRecalculateEnabled) {
      buttonsToRender.push({
        tooltip: "Recheck",
        button: (btnProps) => (
          <Button
            icon={RecalculateIcon}
            label={"Recheck"}
            onClick={handleRecheckButtonClick}
            {...btnProps}
          />
        )
      });
    }

    if (onJiraButtonClick) {
      buttonsToRender.push({
        tooltip: "Open ticket info",
        button: (btnProps) => (
          <JiraButton
            ticketLink={jiraTicketInfo?.ticketLink}
            isHintEnabled={jiraTicketInfo?.isHintEnabled}
            spanCodeObjectId={jiraTicketInfo?.spanCodeObjectId}
            label={"Ticket"}
            onTicketInfoOpen={openTicketInfo}
            insightType={insight.type}
            {...btnProps}
          />
        )
      });
    }

    if (isJaegerEnabled && onGoToTrace) {
      buttonsToRender.push({
        tooltip: "Open Trace",
        button: (btnProps) => (
          <Button
            icon={TraceIcon}
            label={"Trace"}
            onClick={() => onGoToTrace()}
            {...btnProps}
          />
        )
      });
    }

    if (onGoToLive) {
      buttonsToRender.push({
        tooltip: "Open live view",
        button: (btnProps) => (
          <Button
            icon={DoubleCircleIcon}
            label={"Live"}
            onClick={() => onGoToLive()}
            {...btnProps}
          />
        )
      });
    }

    if (onPin) {
      buttonsToRender.push({
        tooltip: "Pin",
        button: (btnProps) => (
          <Button icon={PinIcon} label={"Pin"} {...btnProps} />
        )
      });
    }

    if (buttonsToRender.length === 0) {
      return;
    }

    const toolbarActions = buttonsToRender.slice(0, -1);
    const mainAction = buttonsToRender[buttonsToRender.length - 1];

    return (
      <s.Actions>
        {toolbarActions.map((toolbarAction) => (
          <Tooltip key={toolbarAction.tooltip} title={toolbarAction.tooltip}>
            <div>
              <toolbarAction.button buttonType={"tertiary"} label={undefined} />
            </div>
          </Tooltip>
        ))}
        <s.MainActions>
          <mainAction.button buttonType={"primary"} />
        </s.MainActions>
      </s.Actions>
    );
  };

  const { showBanner, showTimer } = getRecalculateVisibilityParams();

  const isFooterVisible = Boolean(renderActions() ?? insight.isDismissible);

  return (
    <s.StyledCard
      $isDismissed={insight.isDismissed}
      $isRead={insight.isRead}
      $isReadable={insight.isReadable}
      onClick={handleClick}
      header={
        <InsightHeader
          insight={insight}
          isAsync={isAsync}
          onSpanLinkClick={handleSpanLinkClick}
          lastUpdateTimer={showTimer ? insight.actualStartTime : null}
        />
      }
      content={
        <s.ContentContainer>
          {isCritical && (
            <ProductionAffectionBar
              isTicketCreated={isString(insight.ticketLink)}
              onCreateTicket={
                onJiraButtonClick ? handleCreateTicketLinkClick : undefined
              }
            />
          )}
          {showBanner && <RecalculateBar />}
          {content}
        </s.ContentContainer>
      }
      footer={
        isFooterVisible ? (
          <>
            {!isDismissConfirmationOpened ? (
              <s.InsightFooter>
                {insight.isDismissible && (
                  <s.ButtonContainer>
                    {insight.isDismissed ? (
                      <s.DismissButton
                        label={isDismissalChangeInProgress ? "Showing" : "Show"}
                        buttonType={"tertiary"}
                        isDisabled={isDismissalChangeInProgress}
                        onClick={handleShowClick}
                      />
                    ) : (
                      <s.DismissButton
                        icon={CrossIcon}
                        isDisabled={isDismissalChangeInProgress}
                        label={
                          isDismissalChangeInProgress ? "Dismissing" : "Dismiss"
                        }
                        buttonType={"tertiary"}
                        onClick={() => setDismissConfirmationOpened(true)}
                      />
                    )}
                    {isDismissalChangeInProgress && <Spinner />}
                  </s.ButtonContainer>
                )}
                {renderActions()}
              </s.InsightFooter>
            ) : (
              <s.DismissDialog>
                Dismiss insight?
                <s.DismissDialogActions>
                  <Button
                    label={"No"}
                    buttonType={"primary"}
                    onClick={() => setDismissConfirmationOpened(false)}
                  />
                  <Button
                    label={"Yes, dismiss"}
                    buttonType={"secondary"}
                    onClick={handleDismissClick}
                  />
                </s.DismissDialogActions>
              </s.DismissDialog>
            )}
          </>
        ) : undefined
      }
    />
  );
};
