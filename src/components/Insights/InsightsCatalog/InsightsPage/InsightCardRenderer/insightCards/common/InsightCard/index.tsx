import { Fragment, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../../../../../../../hooks/usePrevious";
import { platform } from "../../../../../../../../platform";
import {
  useCreateIncidentFromInsightMutation,
  useMarkInsightReadMutation,
  useRecheckInsightMutation
} from "../../../../../../../../redux/services/digma";
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
import * as s from "./styles";
import type { Action, InsightCardProps } from "./types";

const HIGH_CRITICALITY_THRESHOLD = 0.8;

export const InsightCard = ({
  insight,
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
  const [markRead, markReadResult] = useMarkInsightReadMutation();
  const [recheck] = useRecheckInsightMutation();
  const {
    isJaegerEnabled,
    areInsightSuggestionsEnabled,
    isAgenticEnabled,
    isSandboxModeEnabled
  } = useConfigSelector();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [createIncidentFromInsight, createIncidentFromInsightResult] =
    useCreateIncidentFromInsightMutation();

  const isCritical = insight.criticality > HIGH_CRITICALITY_THRESHOLD;

  useEffect(() => {
    if (
      onDismissalChange &&
      previousDismissalData !== dismissalData &&
      dismissalData?.payload.status === "success"
    ) {
      onDismissalChange(dismissalData.action, dismissalData.payload.insightId);
    }
  }, [dismissalData, previousDismissalData, onDismissalChange]);

  const handleRecheckButtonClick = () => {
    void recheck({
      environment: insight.environment,
      id: insight.id,
      time: new Date().toISOString()
    });
  };

  const handleIdeButtonClick = () => {
    if (
      (isSpanInsight(insight) || isEndpointInsight(insight)) &&
      insight.spanInfo
    ) {
      const spanIdeLauncherLink = getIdeLauncherLinkForSpan(
        insight.spanInfo.uid
      );

      if (spanIdeLauncherLink) {
        openURLInDefaultBrowser(spanIdeLauncherLink);
      }
    }
  };

  const handleHistogramButtonClick = () => {
    if (
      (isSpanInsight(insight) || isEndpointInsight(insight)) &&
      insight.spanInfo &&
      onOpenHistogram
    ) {
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
      showBanner: insight.status === InsightStatus.InEvaluation
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

  const markAsRead = () => {
    void markRead({
      insightIds: [insight.id]
    });
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

  const handleTicketMenuItemClick = () => {
    openTicketInfo(
      jiraTicketInfo?.spanCodeObjectId,
      "ticket menu item clicked"
    );
  };

  const handleP50TraceButtonClick = () => {
    if (onGoToP50Trace) {
      onGoToP50Trace();
    }
  };

  const handleP95TraceButtonClick = () => {
    if (onGoToP95Trace) {
      onGoToP95Trace();
    }
  };

  const handleTraceButtonClick = () => {
    if (onGoToTrace) {
      onGoToTrace();
    }
  };

  const handleLiveButtonClick = () => {
    if (onGoToLive) {
      onGoToLive();
    }
  };

  const handlePinButtonClick = () => {
    // TODO: implement
  };

  const handleInfoCloseButtonClick = () => {
    setShowInfo(false);
  };

  const handleInfoButtonClick = () => {
    setShowInfo(!showInfo);
  };

  const handleSuggestionButtonClick = () => {
    if (onOpenSuggestion) {
      onOpenSuggestion(insight.id);
    }
  };

  const handleInvestigateButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_INVESTIGATE_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    void createIncidentFromInsight({
      insightId: insight.id
    })
      .unwrap()
      .then((data) => {
        const incidentId = data.incidentId;
        openURLInDefaultBrowser(`/agentic/incidents/${incidentId}`);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error("Failed to create incident from insight");
      });
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
        onRecheck={handleRecheckButtonClick}
        onMarkAsRead={markAsRead}
        onTicketOpen={handleTicketMenuItemClick}
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
            isDisabled={markReadResult.isLoading}
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
          <ActionButton
            type={type}
            icon={CodeIcon}
            label={"IDE"}
            title={"Open in IDE"}
            onClick={handleIdeButtonClick}
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
            onClick={handleP50TraceButtonClick}
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
            onClick={handleP95TraceButtonClick}
          />
        );
      case "openTrace":
        return (
          <ActionButton
            type={type}
            icon={TraceIcon}
            label={"Trace"}
            title={"Open Trace"}
            onClick={handleTraceButtonClick}
          />
        );
      case "openLiveView":
        return (
          <ActionButton
            type={type}
            icon={DoubleCircleIcon}
            label={"Live"}
            title={"Open live view"}
            onClick={handleLiveButtonClick}
          />
        );
      case "pin":
        return (
          <ActionButton
            type={type}
            icon={PinIcon}
            label={"Pin"}
            title={"Pin"}
            onClick={handlePinButtonClick}
          />
        );
      case "info":
        return (
          <InsightsInfo
            isOpen={showInfo}
            description={insightTypeInfo?.description}
            documentationLink={insightTypeInfo?.documentationLink}
            onClose={handleInfoCloseButtonClick}
          >
            <s.InfoActionButton
              icon={QuestionMarkIcon}
              buttonType={"secondaryBorderless"}
              onClick={handleInfoButtonClick}
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
      case "investigate":
        return (
          <s.InvestigateButton
            icon={
              createIncidentFromInsightResult.isLoading
                ? () => <s.InvestigateButtonSpinner />
                : LightBulbWithScrewIcon
            }
            onClick={handleInvestigateButtonClick}
            isDisabled={createIncidentFromInsightResult.isLoading}
            label={
              createIncidentFromInsightResult.isLoading
                ? "Investigating..."
                : "Investigate"
            }
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

    if (insight.isRecalculateEnabled) {
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

    if (onGoToLive && platform === "JetBrains") {
      actions.push("openLiveView");
    }

    if (onPin) {
      actions.push("pin");
    }

    if (areInsightSuggestionsEnabled && !isAgenticEnabled && onOpenSuggestion) {
      actions.push("openSuggestion");
    }

    if (isAgenticEnabled && insight.isDismissible && platform === "Web") {
      actions.push("investigate");
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
      ref={cardRef}
      $isDismissed={insight.isDismissed}
      $isRead={insight.isRead}
      $isReadable={insight.isReadable}
      onClick={handleClick}
      className={"insight-card"}
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
  );
};
