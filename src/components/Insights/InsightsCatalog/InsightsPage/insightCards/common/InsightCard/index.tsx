import { Fragment, useEffect, useState } from "react";
import { useGlobalStore } from "../../../../../../../containers/Main/stores/global/useGlobalStore";
import { dispatcher } from "../../../../../../../dispatcher";
import { usePrevious } from "../../../../../../../hooks/usePrevious";
import { isString } from "../../../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { Spinner } from "../../../../../../Navigation/CodeButtonMenu/Spinner";
import { CheckmarkCircleIcon } from "../../../../../../common/icons/12px/CheckmarkCircleIcon";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { DoubleCircleIcon } from "../../../../../../common/icons/16px/DoubleCircleIcon";
import { HistogramIcon } from "../../../../../../common/icons/16px/HistogramIcon";
import { PinIcon } from "../../../../../../common/icons/16px/PinIcon";
import { RecheckIcon } from "../../../../../../common/icons/16px/RecheckIcon";
import { CrossIcon } from "../../../../../../common/icons/CrossIcon";
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { NewButton } from "../../../../../../common/v3/NewButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { actions } from "../../../../../actions";
import { trackingEvents } from "../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../typeGuards";
import { InsightStatus } from "../../../../../types";
import { IssueCompactCard } from "../IssueCompactCard";
import { ActionButton } from "./ActionButton";
import { ActionButtonType } from "./ActionButton/types";
import { InsightHeader } from "./InsightHeader";
import { ProductionAffectionBar } from "./ProductionAffectionBar";
import { RecalculateBar } from "./RecalculateBar";
import { useDismissal } from "./hooks/useDismissal";
import { useMarkingAsRead } from "./hooks/useMarkingAsRead";
import * as s from "./styles";
import { Action, InsightCardProps, RecalculateResponse } from "./types";

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
  isAsync,
  viewMode,
  mainMetric
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
  const isJaegerEnabled = useGlobalStore().isJaegerEnabled;
  const [insightStatus, setInsightStatus] = useState(insight.status);

  const isCritical = insight.criticality > HIGH_CRITICALITY_THRESHOLD;

  // reset internal state after recalculate
  useEffect(() => {
    setInsightStatus(insight.status);
  }, [insight.status]);

  useEffect(() => {
    const handleRecalculatedSet = (data: unknown) => {
      const recalculateResponse = data as RecalculateResponse;
      if (recalculateResponse && insight.id === recalculateResponse.insightId) {
        setInsightStatus(InsightStatus.InEvaluation);
        onRefresh(insight.type);
      }
    };

    dispatcher.addActionListener(
      actions.SET_RECALCULATED,
      handleRecalculatedSet
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_RECALCULATED,
        handleRecalculatedSet
      );
    };
  }, [insight.id]);

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

  const goToSpan = () => {
    if (
      (isSpanInsight(insight) || isEndpointInsight(insight)) &&
      insight.spanInfo
    ) {
      onGoToSpan(insight.spanInfo.spanCodeObjectId);
    }
  };

  const handleSpanLinkClick = () => {
    goToSpan();
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

  if (viewMode === "compact") {
    return (
      <IssueCompactCard
        insight={insight}
        metric={mainMetric}
        onGoToSpan={goToSpan}
        onGoToTrace={onGoToTrace}
        onDismiss={dismiss}
        onShow={show}
        onRecheck={() => onRecalculate(insight.id)}
        onMarkAsRead={markAsRead}
        onTicketOpen={() =>
          openTicketInfo(
            jiraTicketInfo?.spanCodeObjectId,
            "ticket menu item clicked"
          )
        }
        isCritical={isCritical}
      />
    );
  }

  const renderAction = (action: Action, type: ActionButtonType) => {
    switch (action) {
      case "markAsRead":
        return (
          <ActionButton
            type={type}
            icon={CheckmarkCircleIcon}
            label={"Mark as read"}
            title={"Mark as read"}
            isDisabled={isMarkingAsReadInProgress}
            onClick={handleMarkAsReadButtonClick}
          />
        );
      case "openHistogram":
        return (
          <ActionButton
            type={type}
            icon={HistogramIcon}
            label={"Histogram"}
            title={"Open Histogram"}
            onClick={handleHistogramButtonClick}
          />
        );
      case "recheck":
        return (
          <ActionButton
            type={type}
            icon={RecheckIcon}
            label={"Recheck"}
            title={"Recheck"}
            onClick={handleRecheckButtonClick}
          />
        );
      case "viewTicketInfo":
        return (
          <Tooltip title={"Open ticket info"}>
            <JiraButton
              type={type}
              ticketLink={jiraTicketInfo?.ticketLink}
              isHintEnabled={jiraTicketInfo?.isHintEnabled}
              spanCodeObjectId={jiraTicketInfo?.spanCodeObjectId}
              label={"Ticket"}
              onTicketInfoOpen={openTicketInfo}
              insightType={insight.type}
            />
          </Tooltip>
        );
      case "openTrace":
        return (
          <ActionButton
            type={type}
            icon={TraceIcon}
            label={"Trace"}
            title={"Open Trace"}
            onClick={() => onGoToTrace && onGoToTrace()}
          />
        );
      case "openLiveView":
        return (
          <ActionButton
            type={type}
            icon={DoubleCircleIcon}
            label={"Live"}
            title={"Open live view"}
            onClick={() => onGoToLive && onGoToLive()}
          />
        );
      case "pin":
        return (
          <ActionButton
            type={type}
            icon={PinIcon}
            label={"Pin"}
            title={"Pin"}
            onClick={() =>
              //TODO: implement
              {
                return undefined;
              }
            }
          />
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
    const actions: Action[] = [];

    if (
      isMarkAsReadButtonEnabled &&
      insight.isReadable &&
      insight.isRead === false
    ) {
      actions.push("markAsRead");
    }

    if (onOpenHistogram) {
      actions.push("openHistogram");
    }

    if (insight.isRecalculateEnabled) {
      actions.push("recheck");
    }

    if (onJiraButtonClick) {
      actions.push("viewTicketInfo");
    }

    if (isJaegerEnabled && onGoToTrace) {
      actions.push("openTrace");
    }

    if (onGoToLive) {
      actions.push("openLiveView");
    }

    if (onPin) {
      actions.push("pin");
    }

    if (actions.length === 0) {
      return;
    }

    const toolbarActions = actions.slice(0, -1);
    const mainAction = actions[actions.length - 1];

    return (
      <s.Actions>
        {toolbarActions.map((toolbarAction) => (
          <Fragment key={toolbarAction}>
            {renderAction(toolbarAction, "icon")}
          </Fragment>
        ))}
        <s.MainActionContainer>
          {renderAction(mainAction, "regular")}
        </s.MainActionContainer>
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
                      <NewButton
                        label={isDismissalChangeInProgress ? "Showing" : "Show"}
                        buttonType={"secondaryBorderless"}
                        isDisabled={isDismissalChangeInProgress}
                        onClick={handleShowClick}
                      />
                    ) : (
                      <NewButton
                        icon={CrossIcon}
                        isDisabled={isDismissalChangeInProgress}
                        label={
                          isDismissalChangeInProgress ? "Dismissing" : "Dismiss"
                        }
                        buttonType={"secondaryBorderless"}
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
                  <NewButton
                    label={"No"}
                    onClick={() => setDismissConfirmationOpened(false)}
                  />
                  <NewButton
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
