import { Fragment, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../../../../../dispatcher";
import { usePrevious } from "../../../../../../../hooks/usePrevious";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { useInsightsSelector } from "../../../../../../../store/insights/useInsightsSelector";
import { useStore } from "../../../../../../../store/useStore";
import { isString } from "../../../../../../../typeGuards/isString";
import { sendUserActionTrackingEvent } from "../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../../../../utils/getInsightTypeInfo";
import { DismissPanel } from "../../../../../../common/DismissPanel";
import { CheckmarkCircleIcon } from "../../../../../../common/icons/12px/CheckmarkCircleIcon";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { DoubleCircleIcon } from "../../../../../../common/icons/16px/DoubleCircleIcon";
import { HistogramIcon } from "../../../../../../common/icons/16px/HistogramIcon";
import { PinIcon } from "../../../../../../common/icons/16px/PinIcon";
import { QuestionMarkIcon } from "../../../../../../common/icons/16px/QuestionMarkIcon";
import { RecheckIcon } from "../../../../../../common/icons/16px/RecheckIcon";
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { actions } from "../../../../../actions";
import { trackingEvents } from "../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../typeGuards";
import { InsightStatus } from "../../../../../types";
import { ViewMode } from "../../../../types";
import { IssueCompactCard } from "../IssueCompactCard";
import { ActionButton } from "./ActionButton";
import type { ActionButtonType } from "./ActionButton/types";
import { InsightHeader } from "./InsightHeader";
import { InsightsInfo } from "./InsightsInfo";
import { ProductionAffectionBar } from "./ProductionAffectionBar";
import { RecalculateBar } from "./RecalculateBar";
import { useDismissal } from "./hooks/useDismissal";
import { useMarkingAsRead } from "./hooks/useMarkingAsRead";
import * as s from "./styles";
import type { Action, InsightCardProps, RecalculateResponse } from "./types";

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
  const { data } = useInsightsSelector();
  const { setInsightsViewMode } = useStore.getState();
  const {
    isDismissalChangeInProgress,
    dismiss,
    show,
    data: dismissalData
  } = useDismissal(insight.id);
  const previousDismissalData = usePrevious(dismissalData);
  const { isMarkingAsReadInProgress, markAsRead } = useMarkingAsRead(
    insight.id
  );
  const isOperationInProgress =
    isDismissalChangeInProgress || isMarkingAsReadInProgress;
  const previousIsOperationInProgress = usePrevious(isOperationInProgress);
  const { isJaegerEnabled } = useConfigSelector();
  const [insightStatus, setInsightStatus] = useState(insight.status);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);

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
  }, [insight.id, insight.type, onRefresh]);

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

  useEffect(() => {
    if (
      previousDismissalData !== dismissalData &&
      dismissalData?.payload.status === "success" &&
      dismissalData.action === actions.SET_UNDISMISS_RESPONSE &&
      data?.dismissedCount === 1 &&
      data.insights[0].id === dismissalData.payload.insightId
    ) {
      setInsightsViewMode(ViewMode.All);
    }
  }, [data, dismissalData, previousDismissalData, setInsightsViewMode]);

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

  const insightTypeInfo = getInsightTypeInfo(insight.type, insight.subType);
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
              // TODO: implement
              {
                return undefined;
              }
            }
          />
        );
      case "info":
        return (
          <InsightsInfo
            isOpen={showInfo}
            description={insightTypeInfo?.description}
            documentationLink={insightTypeInfo?.documentationLink}
            onClose={() => {
              setShowInfo(false);
            }}
          >
            <s.InfoActionButton
              icon={QuestionMarkIcon}
              buttonType={"secondaryBorderless"}
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            />
          </InsightsInfo>
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
    const actions: Action[] = [];
    if (insightTypeInfo?.description) {
      actions.push("info");
    }

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
    <>
      <s.StyledCard
        ref={cardRef}
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
            <s.InsightFooter>
              {insight.isDismissible && (
                <DismissPanel
                  onShow={handleShowClick}
                  onDismiss={handleDismissClick}
                  confirmationMessage={"Dismiss insight?"}
                  state={
                    isDismissalChangeInProgress
                      ? "in-progress"
                      : insight.isDismissed
                      ? "dismissed"
                      : "visible"
                  }
                />
              )}
              {renderActions()}
            </s.InsightFooter>
          ) : undefined
        }
      />
    </>
  );
};
