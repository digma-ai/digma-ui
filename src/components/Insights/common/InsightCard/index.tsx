import React, { useContext, useEffect, useState } from "react";
import { isString } from "../../../../typeGuards/isString";
import { TraceIcon } from "../../../common/icons/12px/TraceIcon";
import { HistogramIcon } from "../../../common/icons/16px/HistogramIcon";
import { LiveIcon } from "../../../common/icons/16px/LiveIcon";
import { PinIcon } from "../../../common/icons/16px/PinIcon";
import { RecalculateIcon } from "../../../common/icons/16px/RecalculateIcon";
import { CrossIcon } from "../../../common/icons/CrossIcon";
import { Button } from "../../../common/v3/Button";
import { BaseButtonProps } from "../../../common/v3/Button/types";
import { JiraButton } from "../../../common/v3/JiraButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { isEndpointInsight, isSpanInsight } from "../../typeGuards";
import { InsightHeader } from "./InsightHeader";
import * as s from "./styles";
import { InsightCardProps } from "./types";

import { getFeatureFlagValue } from "../../../../featureFlags";
import { usePrevious } from "../../../../hooks/usePrevious";
import { FeatureFlag } from "../../../../types";
import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { Spinner } from "../../../Navigation/CodeButtonMenu/Spinner";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { trackingEvents } from "../../tracking";
import { InsightStatus } from "../../types";
import { ProductionAffectionBar } from "./ProductionAffectionBar";
import { RecalculateBar } from "./RecalculateBar";
import { useDismissal } from "./hooks/useDismissal";
import { useMarkingAsRead } from "./hooks/useMarkingAsRead";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds
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
    props.insight.prefixedCodeObjectId &&
      props.onRecalculate &&
      props.onRecalculate(props.insight.id);
    setIsRecalculatingStarted(true);
    // TODO: handle Recheck response and refresh the insight data
    setInsightStatus(InsightStatus.InEvaluation);
  };

  const handleHistogramButtonClick = () => {
    isSpanInsight(props.insight) &&
      props.insight.spanInfo &&
      props.onOpenHistogram &&
      props.onOpenHistogram(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
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

    if (
      getFeatureFlagValue(config, FeatureFlag.IS_RECALCULATE_BUBBLE_ENABLED)
    ) {
      return {
        showTimer: areStartTimesEqual,
        showBanner: insightStatus === InsightStatus.InEvaluation
      };
    }

    return {
      showTimer: areStartTimesEqual,
      showBanner:
        !areStartTimesEqual &&
        props.insight.actualStartTime &&
        (props.insight.customStartTime || isRecalculatingStarted)
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
    sendTrackingEvent(trackingEvents.INSIGHT_CARD_DISMISS_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    dismiss();
    setDismissConfirmationOpened(false);
  };

  const handleShowClick = () => {
    sendTrackingEvent(trackingEvents.INSIGHT_CARD_SHOW_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    show();
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
    sendTrackingEvent(trackingEvents.INSIGHT_CARD_CREATE_TICKET_LINK_CLICKED, {
      insightType: props.insight.type
    });
    openTicketInfo(
      props.jiraTicketInfo?.spanCodeObjectId,
      "create ticket link clicked"
    );
  };

  const handleClick = () => {
    if (props.insight.isReadable && props.insight.isRead === false) {
      markAsRead();
    }
  };

  const renderActions = () => {
    const buttonsToRender: {
      tooltip: string;
      button: React.ComponentType<BaseButtonProps>;
    }[] = [];

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
            icon={LiveIcon}
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

  const isNew = isString(props.insight.firstDetected)
    ? Date.now() - new Date(props.insight.firstDetected).valueOf() <
      IS_NEW_TIME_LIMIT
    : false;

  return (
    <s.StyledInsightCard
      $isDismissed={props.insight.isDismissed}
      $isRead={props.insight.isRead}
      $isReadable={props.insight.isReadable}
      onClick={handleClick}
      header={
        <InsightHeader
          spanInfo={
            isSpanInsight(props.insight) || isEndpointInsight(props.insight)
              ? props.insight.spanInfo
              : undefined
          }
          status={insightStatus}
          isNew={isNew}
          isAsync={props.isAsync}
          insightType={props.insight.type}
          importance={props.insight.importance}
          criticality={props.insight.criticality}
          onSpanLinkClick={handleSpanLinkClick}
          lastUpdateTimer={showTimer ? props.insight.actualStartTime : null}
        />
      }
      content={
        <s.ContentContainer>
          {isCritical && (
            <ProductionAffectionBar
              isTicketCreated={isString(props.insight.ticketLink)}
              onCreateTicket={handleCreateTicketLinkClick}
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
