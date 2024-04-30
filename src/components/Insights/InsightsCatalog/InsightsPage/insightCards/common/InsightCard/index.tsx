import React, { useContext, useEffect, useState } from "react";
import { usePrevious } from "../../../../../../../hooks/usePrevious";
import { isString } from "../../../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { Spinner } from "../../../../../../Navigation/CodeButtonMenu/Spinner";
import { ConfigContext } from "../../../../../../common/App/ConfigContext";
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

export const InsightCard = (props: InsightCardProps) => {
  const [isRecalculatingStarted, setIsRecalculatingStarted] = useState(false);
  const [isDismissConfirmationOpened, setDismissConfirmationOpened] =
    useState(false);
  const { isDismissalChangeInProgress, dismiss, show } = useDismissal(
    props.insight.id
  );
  const { isMarkingAsReadInProgress, markAsRead } = useMarkingAsRead(
    props.insight.id
  );
  const isOperationInProgress =
    isDismissalChangeInProgress || isMarkingAsReadInProgress;
  const previousIsOperationInProgress = usePrevious(isOperationInProgress);
  const config = useContext(ConfigContext);
  const [insightStatus, setInsightStatus] = useState(props.insight.status);

  const isCritical = props.insight.criticality > HIGH_CRITICALITY_THRESHOLD;

  // TODO: remove and refresh the insight data
  useEffect(() => {
    setInsightStatus(props.insight.status);
  }, [props.insight.status]);

  useEffect(() => {
    if (previousIsOperationInProgress && !isOperationInProgress) {
      props.onRefresh(props.insight.type);
    }
  }, [
    previousIsOperationInProgress,
    isOperationInProgress,
    props.onRefresh,
    props.insight.type
  ]);

  const handleRecheckButtonClick = () => {
    props.onRecalculate && props.onRecalculate(props.insight.id);
    setIsRecalculatingStarted(true);
    // TODO: handle Recheck response and refresh the insight data
    setInsightStatus(InsightStatus.InEvaluation);
  };

  const handleHistogramButtonClick = () => {
    isSpanInsight(props.insight) &&
      props.insight.spanInfo &&
      props.onOpenHistogram &&
      props.onOpenHistogram(
        props.insight.spanInfo.spanCodeObjectId,
        props.insight.type,
        props.insight.spanInfo.displayName
      );
  };

  const getRecalculateVisibilityParams = () => {
    const areStartTimesEqual =
      props.insight.customStartTime &&
      props.insight.actualStartTime &&
      new Date(props.insight.actualStartTime).valueOf() -
        new Date(props.insight.customStartTime).valueOf() ===
        0;

    return {
      showTimer: areStartTimesEqual,
      showBanner: insightStatus === InsightStatus.InEvaluation
    };
  };

  const handleSpanLinkClick = () => {
    if (
      (isSpanInsight(props.insight) || isEndpointInsight(props.insight)) &&
      props.insight.spanInfo
    ) {
      props.onGoToSpan(props.insight.spanInfo.spanCodeObjectId);
    }
  };

  const handleDismissClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_DISMISS_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );
    dismiss();
    setDismissConfirmationOpened(false);
  };

  const handleShowClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_SHOW_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );
    show();
  };

  const handleMarkAsReadButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_MARK_AS_READ_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );
    markAsRead();
  };

  const openTicketInfo = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (props.onJiraButtonClick) {
      props.onJiraButtonClick(spanCodeObjectId, event);
    }
  };

  const handleCreateTicketLinkClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_CREATE_TICKET_LINK_CLICKED,
      {
        insightType: props.insight.type
      }
    );
    openTicketInfo(
      props.jiraTicketInfo?.spanCodeObjectId,
      "create ticket link clicked"
    );
  };

  const handleClick = () => {
    if (
      !props.isMarkAsReadButtonEnabled &&
      props.insight.isReadable &&
      props.insight.isRead === false
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
      props.isMarkAsReadButtonEnabled &&
      props.insight.isReadable &&
      props.insight.isRead === false
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

    props.onOpenHistogram &&
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

    props.insight.isRecalculateEnabled &&
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

    props.onJiraButtonClick &&
      buttonsToRender.push({
        tooltip: "Open ticket info",
        button: (btnProps) => (
          <JiraButton
            ticketLink={props.jiraTicketInfo?.ticketLink}
            isHintEnabled={props.jiraTicketInfo?.isHintEnabled}
            spanCodeObjectId={props.jiraTicketInfo?.spanCodeObjectId}
            label={"Ticket"}
            onTicketInfoOpen={openTicketInfo}
            insightType={props.insight.type}
            {...btnProps}
          />
        )
      });

    config.isJaegerEnabled &&
      props.onGoToTrace &&
      buttonsToRender.push({
        tooltip: "Open Trace",
        button: (btnProps) => (
          <Button
            icon={TraceIcon}
            label={"Trace"}
            onClick={() => props.onGoToTrace && props.onGoToTrace()}
            {...btnProps}
          />
        )
      });

    props.onGoToLive &&
      buttonsToRender.push({
        tooltip: "Open live view",
        button: (btnProps) => (
          <Button
            icon={DoubleCircleIcon}
            label={"Live"}
            onClick={() => props.onGoToLive && props.onGoToLive()}
            {...btnProps}
          />
        )
      });

    props.onPin &&
      buttonsToRender.push({
        tooltip: "Pin",
        button: (btnProps) => (
          <Button icon={PinIcon} label={"Pin"} {...btnProps} />
        )
      });

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

  return (
    <s.StyledInsightCard
      $isDismissed={props.insight.isDismissed}
      $isRead={props.insight.isRead}
      $isReadable={props.insight.isReadable}
      onClick={handleClick}
      header={
        <InsightHeader
          insight={props.insight}
          isAsync={props.isAsync}
          onSpanLinkClick={handleSpanLinkClick}
          lastUpdateTimer={showTimer ? props.insight.actualStartTime : null}
        />
      }
      content={
        <s.ContentContainer>
          {isCritical && (
            <ProductionAffectionBar
              isTicketCreated={isString(props.insight.ticketLink)}
              onCreateTicket={
                props.onJiraButtonClick
                  ? handleCreateTicketLinkClick
                  : undefined
              }
            />
          )}
          {showBanner && <RecalculateBar />}
          {props.content}
        </s.ContentContainer>
      }
      footer={
        <>
          {!isDismissConfirmationOpened ? (
            <s.InsightFooter>
              {props.insight.isDismissible && (
                <s.ButtonContainer>
                  {props.insight.isDismissed ? (
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
      }
    />
  );
};
