import { useEffect, useState } from "react";
import { usePersistence } from "../../../../hooks/usePersistence";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { InsightType, SCOPE_CHANGE_EVENTS } from "../../../../types";
import { changeScope } from "../../../../utils/actions/changeScope";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { getInsightTypeOrderPriority } from "../../../../utils/getInsightTypeOrderPriority";
import { Card } from "../../../common/Card";
import { Tooltip } from "../../../common/Tooltip";
import { EndpointIcon } from "../../../common/icons/EndpointIcon";
import { OpenTelemetryLogoIcon } from "../../../common/icons/OpenTelemetryLogoIcon";
import { actions } from "../../actions";
import { Description } from "../../styles";
import { trackingEvents } from "../../tracking";
import {
  isCodeObjectErrorsInsight,
  isCodeObjectHotSpotInsight,
  isEndpointInsight,
  isFunctionInsight,
  isSpanInsight,
  isSpanScalingInsufficientDataInsight,
  isSpanScalingWellInsight
} from "../../typeGuards";
import {
  GenericCodeObjectInsight,
  GenericEndpointInsight,
  GenericSpanInsight,
  InsightGroup,
  MethodSpan
} from "../../types";
import { InsightCard } from "./InsightCard";
import { NoObservabilityCard } from "./NoObservabilityCard";
import { ErrorsInsight } from "./insightCards/ErrorsInsight";
import { NoScalingIssueInsight } from "./insightCards/NoScalingIssueInsight";
import { PerformanceAtScaleInsight } from "./insightCards/PerformanceAtScaleInsight";

import * as s from "./styles";
import {
  InsightListProps,
  RecalculatePayload,
  isInsightJiraTicketHintShownPayload
} from "./types";

const getInsightToShowJiraHint = (
  insightGroups: InsightGroup[]
): { groupIndex: number; insightIndex: number } | null => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpaNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.EndpointBottleneck,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimizationV2
  ];

  let insightIndex = -1;
  const insightsWithJiraButtonIndex = insightGroups.findIndex((x) =>
    x.insights.some((insight, i) => {
      if (insightsWithJiraButton.includes(insight.type)) {
        insightIndex = i;
        return true;
      }
      return false;
    })
  );

  if ([insightsWithJiraButtonIndex, insightIndex].includes(-1)) {
    return null;
  }

  return {
    groupIndex: insightsWithJiraButtonIndex,
    insightIndex: insightIndex
  };
};

const groupInsights = (
  insights: GenericCodeObjectInsight[],
  spans: MethodSpan[]
): InsightGroup[] => {
  const sortedInsights = [...insights].sort(
    (a, b) =>
      getInsightTypeOrderPriority(a.type) - getInsightTypeOrderPriority(b.type)
  );

  const sortByName = (a: InsightGroup, b: InsightGroup) => {
    const aName = a.name ?? "";
    const bName = b.name ?? "";
    return aName.localeCompare(bName);
  };

  const ungroupedInsights: GenericCodeObjectInsight[] = [];
  const spanInsightGroups: Record<string, GenericSpanInsight[]> = {};
  const endpointInsightGroups: Record<
    string,
    (GenericEndpointInsight | GenericSpanInsight)[]
  > = {};

  for (const insight of sortedInsights) {
    // Do not show unknown insights
    const insightTypeInfo = getInsightTypeInfo(insight.type);
    if (!insightTypeInfo) {
      continue;
    }

    if (!isSpanInsight(insight) && !isEndpointInsight(insight)) {
      ungroupedInsights.push(insight);
      continue;
    }

    const displayName = insight.spanInfo?.displayName;

    if (isFunctionInsight(insight) || !displayName) {
      ungroupedInsights.push(insight);
      continue;
    }

    if (isEndpointInsight(insight)) {
      if (!endpointInsightGroups[displayName]) {
        endpointInsightGroups[displayName] = [];
      }

      endpointInsightGroups[displayName].push(insight);
      continue;
    }

    if (isSpanInsight(insight)) {
      if (endpointInsightGroups[displayName]) {
        endpointInsightGroups[displayName].push(insight);
        continue;
      }

      if (!spanInsightGroups[displayName]) {
        spanInsightGroups[displayName] = [];
      }

      spanInsightGroups[displayName].push(insight);
    }
  }

  // Add empty span groups
  spans.forEach((x) => {
    if (
      !endpointInsightGroups[x.spanDisplayName] &&
      !spanInsightGroups[x.spanDisplayName]
    ) {
      spanInsightGroups[x.spanDisplayName] = [];
    }
  });

  return [
    ...(ungroupedInsights.length > 0 ? [{ insights: ungroupedInsights }] : []),
    // Endpoint insight groups
    ...Object.values(endpointInsightGroups)
      .map((x) => ({
        icon: EndpointIcon,
        name: x[0].spanInfo?.displayName,
        insights: x
      }))
      .sort(sortByName),
    // Span insight groups
    ...Object.entries(spanInsightGroups)
      .map(([spanDisplayName, insights]) => ({
        icon: OpenTelemetryLogoIcon,
        // TODO: get span name only from methodInfo spans
        name: insights[0]
          ? insights[0].spanInfo?.displayName
          : spans.find(
              (methodSpan) => spanDisplayName === methodSpan.spanDisplayName
            )?.spanDisplayName ?? "",
        insights
      }))
      .sort(sortByName)
  ];
};

const renderInsightCard = (
  insight: GenericCodeObjectInsight,
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void,
  isJiraHintEnabled: boolean,
  isMarkAsReadButtonEnabled: boolean
): JSX.Element | undefined => {
  const handleErrorSelect = (errorId: string, insightType: InsightType) => {
    sendUserActionTrackingEvent(
      trackingEvents.INSIGHT_CARD_ASSET_LINK_CLICKED,
      {
        insightType
      }
    );

    window.sendMessageToDigma({
      action: actions.GO_TO_ERROR,
      payload: {
        errorId
      }
    });
  };

  const handleErrorsExpandButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.GO_TO_ERRORS
    });
  };

  const handleHistogramButtonClick = (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => {
    window.sendMessageToDigma({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        spanCodeObjectId,
        insightType,
        displayName
      }
    });
  };

  const handleRecalculate = (insightId: string) => {
    window.sendMessageToDigma<RecalculatePayload>({
      action: actions.RECALCULATE,
      payload: {
        id: insightId
      }
    });
  };

  const handleRefresh = (insightType: InsightType) => {
    window.sendMessageToDigma({
      action: actions.REFRESH_ALL,
      payload: {
        insightType
      }
    });
  };

  const handleGoToSpan = (spanCodeObjectId: string) => {
    changeScope({
      span: {
        spanCodeObjectId
      },
      context: {
        event:
          SCOPE_CHANGE_EVENTS.INSIGHTS_INSIGHT_CARD_TITLE_ASSET_LINK_CLICKED
      }
    });
  };

  if (isCodeObjectErrorsInsight(insight)) {
    return (
      <ErrorsInsight
        key={insight.type}
        insight={insight}
        onErrorSelect={handleErrorSelect}
        onExpandButtonClick={handleErrorsExpandButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={"full"}
      />
    );
  }

  if (isCodeObjectHotSpotInsight(insight)) {
    return (
      <InsightCard
        key={insight.type}
        data={insight}
        content={
          <Description>
            Major errors occur or propagate through this function
          </Description>
        }
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isSpanScalingWellInsight(insight)) {
    return (
      <NoScalingIssueInsight
        key={insight.type}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={"full"}
      />
    );
  }

  if (isSpanScalingInsufficientDataInsight(insight)) {
    return (
      <PerformanceAtScaleInsight
        key={insight.type}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
        onGoToSpan={handleGoToSpan}
        isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
        viewMode={"full"}
      />
    );
  }
};

const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

/**
 * @deprecated
 * safe to delete after the confirmation that insight grouping by level,
 *  adding the annotation and autofixing from the sidebar are not needed anymore
 */
export const InsightList = ({
  assetId,
  environment,
  serviceName,
  insights,
  spans,
  onJiraTicketCreate,
  isMarkAsReadButtonEnabled,
  hasObservability,
  canInstrumentMethod,
  hasMissingDependency
}: InsightListProps) => {
  const [insightGroups, setInsightGroups] = useState<InsightGroup[]>([]);
  const [isAutofixing, setIsAutofixing] = useState(false);
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );

  const insightWithJiraHint = getInsightToShowJiraHint(insightGroups);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [assetId, environment, serviceName]);

  useEffect(() => {
    setInsightGroups(groupInsights(insights, spans));

    window.sendMessageToDigma({
      action: actions.MARK_INSIGHT_TYPES_AS_VIEWED,
      payload: {
        insightTypes: insights.map((x) => ({
          type: x.type,
          reopenCount: x.reopenCount
        }))
      }
    });
  }, [insights, spans]);

  const handleAddAnnotation = () => {
    window.sendMessageToDigma({
      action: actions.ADD_ANNOTATION,
      payload: {
        methodId: assetId
      }
    });
  };

  const handleAutofix = () => {
    if (!isAutofixing) {
      window.sendMessageToDigma({
        action: actions.AUTOFIX_MISSING_DEPENDENCY,
        payload: {
          methodId: assetId
        }
      });
    }
    setIsAutofixing(true);
  };

  const handleShowJiraTicket = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => {
    onJiraTicketCreate(insight, spanCodeObjectId);
    if (!isInsightJiraTicketHintShown?.value) {
      sendUserActionTrackingEvent(trackingEvents.JIRA_TICKET_HINT_CLOSED, {
        event
      });
    }
    setIsInsightJiraTicketHintShown({ value: true });
  };

  return (
    <s.Container>
      {insightGroups.map((x, i) => (
        <s.InsightGroup key={x.name ?? "__ungrouped"}>
          {x.name && (
            <s.InsightGroupHeader>
              <s.InsightGroupIconContainer>
                {x.icon && <x.icon size={16} color={"currentColor"} />}{" "}
              </s.InsightGroupIconContainer>
              <Tooltip title={x.name}>
                <s.InsightGroupName>{x.name}</s.InsightGroupName>
              </Tooltip>
            </s.InsightGroupHeader>
          )}
          {x.insights.length > 0 ? (
            x.insights.map((insight, j) => {
              const isJiraHintEnabled =
                !isUndefined(isInsightJiraTicketHintShown) &&
                !isInsightJiraTicketHintShown?.value &&
                i === insightWithJiraHint?.groupIndex &&
                j === insightWithJiraHint?.insightIndex;

              return renderInsightCard(
                insight,
                handleShowJiraTicket,
                isJiraHintEnabled,
                isMarkAsReadButtonEnabled
              );
            })
          ) : (
            <Card
              header={<>No data yet</>}
              content={
                <Description>
                  No data received yet for this span, please trigger some
                  actions using this code to see more insights.
                </Description>
              }
            />
          )}
          {!hasObservability && (
            <NoObservabilityCard
              canInstrumentMethod={canInstrumentMethod}
              hasMissingDependency={hasMissingDependency}
              onAutofix={handleAutofix}
              onAddAnnotation={handleAddAnnotation}
            />
          )}
        </s.InsightGroup>
      ))}
    </s.Container>
  );
};
