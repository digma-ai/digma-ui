import { Fragment, useEffect, useRef, useState } from "react";
import { NOT_SUPPORTED_IN_SANDBOX_MODE_MESSAGE } from "../../../../../../../../constants";
import { dispatcher } from "../../../../../../../../dispatcher";
import { usePrevious } from "../../../../../../../../hooks/usePrevious";
import { platform } from "../../../../../../../../platform";
import { useConfigSelector } from "../../../../../../../../store/config/useConfigSelector";
import { isString } from "../../../../../../../../typeGuards/isString";
import { openURLInDefaultBrowser } from "../../../../../../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getIdeLauncherLinkForSpan } from "../../../../../../../../utils/getIdeLauncherLinkForSpan";
import { getInsightTypeInfo } from "../../../../../../../../utils/getInsightTypeInfo";
import { DismissPanel } from "../../../../../../../common/DismissPanel";
import { CheckmarkCircleIcon } from "../../../../../../../common/icons/12px/CheckmarkCircleIcon";
import { TraceIcon } from "../../../../../../../common/icons/12px/TraceIcon";
import { CodeIcon } from "../../../../../../../common/icons/16px/CodeIcon";
import { DoubleCircleIcon } from "../../../../../../../common/icons/16px/DoubleCircleIcon";
import { HistogramIcon } from "../../../../../../../common/icons/16px/HistogramIcon";
import { LightBulbWithScrewIcon } from "../../../../../../../common/icons/16px/LightBulbWithScrewIcon";
import { PinIcon } from "../../../../../../../common/icons/16px/PinIcon";
import { QuestionMarkIcon } from "../../../../../../../common/icons/16px/QuestionMarkIcon";
import { RecheckIcon } from "../../../../../../../common/icons/16px/RecheckIcon";
import { JiraButton } from "../../../../../../../common/v3/JiraButton";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import { actions } from "../../../../../../actions";
import { trackingEvents } from "../../../../../../tracking";
import { isEndpointInsight, isSpanInsight } from "../../../../../../typeGuards";
import { InsightStatus } from "../../../../../../types";
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
  onGoToP50Trace,
  onGoToP95Trace,
  onGoToLive,
  onPin,
  content,
  isAsync,
  viewMode,
  mainMetric,
  onDismissalChange,
  onOpenSuggestion,
  tooltipBoundaryRef
}: InsightCardProps) => {
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
  const previousIsMarkingAsReadInProgress = usePrevious(
    isMarkingAsReadInProgress
  );
  const {
    isJaegerEnabled,
    areInsightSuggestionsEnabled,
    isSandboxModeEnabled
  } = useConfigSelector();
  const [insightStatus, setInsightStatus] = useState(insight.status);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isIdeSandboxTooltipVisible, setIsIdeSandboxTooltipVisible] =
    useState(false);

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
    if (previousIsMarkingAsReadInProgress && !isMarkingAsReadInProgress) {
      onRefresh(insight.type);
    }
  }, [
    previousIsMarkingAsReadInProgress,
    isMarkingAsReadInProgress,
    onRefresh,
    insight.type
  ]);

  useEffect(() => {
    if (
      previousDismissalData !== dismissalData &&
      dismissalData?.payload.status === "success"
    ) {
      onDismissalChange(dismissalData.action, dismissalData.payload.insightId);
    }
  }, [dismissalData, previousDismissalData, onDismissalChange]);

  const handleRecheckButtonClick = () => {
    if (onRecalculate) {
      onRecalculate(insight.id);
    }
  };

  const handleIdeButtonClick = () => {
    if (isSandboxModeEnabled) {
      setIsIdeSandboxTooltipVisible(true);
      return;
    }

    if (
      (isSpanInsight(insight) || isEndpointInsight(insight)) &&
      insight.spanInfo
    ) {
      const spanInfo = insight.spanInfo;
      const spanIdeLauncherLink = getIdeLauncherLinkForSpan(spanInfo);

      if (spanIdeLauncherLink) {
        openURLInDefaultBrowser(spanIdeLauncherLink);
      }
    }
  };

  const handleHistogramButtonClick = () => {
    if (isSpanInsight(insight) && insight.spanInfo && onOpenHistogram) {
      onOpenHistogram(
        insight.spanInfo.spanCodeObjectId,
        insight.type,
        insight.spanInfo.displayName,
        insight.environment
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

    if (!isSandboxModeEnabled) {
      dismiss();
    }
  };

  const handleIdeActionButtonTooltipDismiss = () => {
    setIsIdeSandboxTooltipVisible(false);
  };

  const handleShowClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_SHOW_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    if (!isSandboxModeEnabled) {
      show();
    }
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
      insight.isRead === false &&
      platform !== "Web"
    ) {
      markAsRead();
    }
  };

  const handleSuggestionButtonClick = () => {
    if (onOpenSuggestion) {
      onOpenSuggestion(insight.id);
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
      case "ide":
        return (
          <Tooltip
            title={NOT_SUPPORTED_IN_SANDBOX_MODE_MESSAGE}
            isOpen={isIdeSandboxTooltipVisible}
            onDismiss={handleIdeActionButtonTooltipDismiss}
          >
            <div>
              <ActionButton
                type={type}
                icon={CodeIcon}
                label={"IDE"}
                title={isIdeSandboxTooltipVisible ? undefined : "Open in IDE"}
                onClick={handleIdeButtonClick}
                onTooltipDismiss={handleIdeActionButtonTooltipDismiss}
              />
            </div>
          </Tooltip>
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
              boundaryRef={tooltipBoundaryRef}
            />
          </Tooltip>
        );
      case "openP50Trace":
        return (
          <ActionButton
            type={type}
            icon={(props) => (
              <s.TraceActionButtonIconContainer>
                <TraceIcon {...props} />
                Median
              </s.TraceActionButtonIconContainer>
            )}
            label={"Trace"}
            title={"Open Median Trace"}
            onClick={() => onGoToP50Trace && onGoToP50Trace()}
          />
        );
      case "openP95Trace":
        return (
          <ActionButton
            type={type}
            icon={(props) => (
              <s.TraceActionButtonIconContainer>
                <TraceIcon {...props} />
                5%
              </s.TraceActionButtonIconContainer>
            )}
            label={"Trace"}
            title={"Open %5 Trace"}
            onClick={() => onGoToP95Trace && onGoToP95Trace()}
          />
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
      case "openSuggestion":
        return (
          <s.SuggestionButton
            icon={LightBulbWithScrewIcon}
            onClick={handleSuggestionButtonClick}
            label={"Suggestion"}
          />
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

    if (insight.isRecalculateEnabled && platform !== "Web") {
      actions.push("recheck");
    }

    if (platform === "Web") {
      actions.push("ide");
    }

    if (onJiraButtonClick) {
      actions.push("viewTicketInfo");
    }

    if (isJaegerEnabled && onGoToP50Trace) {
      actions.push("openP50Trace");
    }

    if (isJaegerEnabled && onGoToP95Trace) {
      actions.push("openP95Trace");
    }

    if (isJaegerEnabled && onGoToTrace) {
      actions.push("openTrace");
    }

    if (onGoToLive && platform !== "Web") {
      actions.push("openLiveView");
    }

    if (onPin) {
      actions.push("pin");
    }

    if (areInsightSuggestionsEnabled && onOpenSuggestion) {
      actions.push("openSuggestion");
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
