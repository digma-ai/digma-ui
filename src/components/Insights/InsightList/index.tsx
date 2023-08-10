import { useEffect, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { actions } from "..";
import { InsightType } from "../../../types";
import { getInsightTypeInfo } from "../../../utils/getInsightTypeInfo";
import { EndpointIcon } from "../../common/icons/EndpointIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/OpenTelemetryLogoIcon";
import { BottleneckInsight } from "../BottleneckInsight";
import { Card } from "../Card";
import { DurationBreakdownInsight } from "../DurationBreakdownInsight";
import { DurationInsight } from "../DurationInsight";
import { DurationSlowdownSourceInsight } from "../DurationSlowdownSourceInsight";
import { EndpointNPlusOneInsight } from "../EndpointNPlusOneInsight";
import { ErrorsInsight } from "../ErrorsInsight";
import { ExcessiveAPICallsInsight } from "../ExcessiveAPICallsInsight";
import { InsightCard } from "../InsightCard";
import { NPlusOneInsight } from "../NPlusOneInsight";
import { NoObservabilityCard } from "../NoObservabilityCard";
import { NoScalingIssueInsight } from "../NoScalingIssueInsight";
import { PerformanceAtScaleInsight } from "../PerformanceAtScaleInsight";
import { RequestBreakdownInsight } from "../RequestBreakdownInsight";
import { ScalingIssueInsight } from "../ScalingIssueInsight";
import { SessionInViewInsight } from "../SessionInViewInsight";
import { SlowEndpointInsight } from "../SlowEndpointInsight";
import { SpanBottleneckInsight } from "../SpanBottleneckInsight";
import { TopUsageInsight } from "../TopUsageInsight";
import { TrafficInsight } from "../TrafficInsight";
import { Description } from "../styles";
import {
  isChattyApiEndpointInsight,
  isCodeObjectErrorsInsight,
  isCodeObjectHotSpotInsight,
  isEndpointBreakdownInsight,
  isEndpointDurationSlowdownInsight,
  isEndpointHighUsageInsight,
  isEndpointInsight,
  isEndpointLowUsageInsight,
  isEndpointNormalUsageInsight,
  isEndpointSlowestSpansInsight,
  isEndpointSuspectedNPlusOneInsight,
  isSessionInViewEndpointInsight,
  isSlowEndpointInsight,
  isSpanDurationBreakdownInsight,
  isSpanDurationsInsight,
  isSpanEndpointBottleneckInsight,
  isSpanInsight,
  isSpanNPlusOneInsight,
  isSpanScalingBadlyInsight,
  isSpanScalingInsufficientDataInsight,
  isSpanScalingWellInsight,
  isSpanUsagesInsight
} from "../typeGuards";
import {
  EndpointInsight,
  GenericCodeObjectInsight,
  InsightGroup,
  MethodSpan,
  SpanInsight,
  Trace
} from "../types";
import * as s from "./styles";
import { InsightListProps } from "./types";

export const getInsightTypeOrderPriority = (type: string): number => {
  const insightOrderPriorityMap: Record<string, number> = {
    [InsightType.HotSpot]: 1,
    [InsightType.Errors]: 2,
    [InsightType.TopErrorFlows]: 3,

    // Endpoint insights
    [InsightType.EndpointBreakdown]: 5,
    [InsightType.HighUsage]: 10,
    [InsightType.SlowEndpoint]: 20,
    [InsightType.EndpointDurationSlowdown]: 25,
    [InsightType.LowUsage]: 30,
    [InsightType.SlowestSpans]: 40,
    [InsightType.NormalUsage]: 50,
    [InsightType.EndpointSpanNPlusOne]: 55,
    [InsightType.EndpointSessionInView]: 56,
    [InsightType.EndpointChattyApi]: 57,

    // Span insights
    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScalingBadly]: 63,
    [InsightType.SpanNPlusOne]: 65,
    [InsightType.SpanDurationChange]: 66,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68
  };

  return insightOrderPriorityMap[type] || Infinity;
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
    const aName = a.name || "";
    const bName = b.name || "";
    return aName.localeCompare(bName);
  };

  const ungroupedInsights: GenericCodeObjectInsight[] = [];
  const spanInsightGroups: { [key: string]: SpanInsight[] } = {};
  const endpointInsightGroups: {
    [key: string]: (EndpointInsight | SpanInsight)[];
  } = {};

  for (const insight of sortedInsights) {
    // Do not show unknown insights
    const insightTypeInfo = getInsightTypeInfo(insight.type);
    if (!insightTypeInfo) {
      continue;
    }

    // Do not show Span Usage insight
    if (insight.type === InsightType.SpanUsageStatus) {
      continue;
    }

    if (!isSpanInsight(insight) && !isEndpointInsight(insight)) {
      ungroupedInsights.push(insight);
      continue;
    }

    const displayName = insight.spanInfo?.displayName;

    if (!displayName) {
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
    if (!spanInsightGroups[x.spanDisplayName]) {
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
            )?.spanDisplayName || "",
        insights
      }))
      .sort(sortByName)
  ];
};

const getInsightGroupIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#7891d0";
    case "dark":
    case "dark-jetbrains":
      return "#7c7c94";
  }
};

const renderInsightCard = (
  insight: GenericCodeObjectInsight
): JSX.Element | undefined => {
  const handleErrorSelect = (errorId: string) => {
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
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        instrumentationLibrary,
        name,
        insightType
      }
    });
  };

  const handleLiveButtonClick = (prefixedCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.OPEN_LIVE_VIEW,
      payload: {
        prefixedCodeObjectId
      }
    });
  };

  const handleTraceButtonClick = (trace: Trace, insightType: InsightType) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        trace,
        insightType
      }
    });
  };

  const handleCompareButtonClick = (
    traces: [Trace, Trace],
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE_COMPARISON,
      payload: {
        traces,
        insightType
      }
    });
  };

  const handleAssetLinkClick = (spanCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_ASSET,
      payload: {
        spanCodeObjectId
      }
    });
  };

  const handleRecalculate = (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.RECALCULATE,
      payload: {
        prefixedCodeObjectId,
        insightType
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

  if (isSpanDurationsInsight(insight)) {
    return (
      <DurationInsight
        key={insight.type}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <DurationBreakdownInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanUsagesInsight(insight)) {
    return (
      <TopUsageInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <BottleneckInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isEndpointSlowestSpansInsight(insight)) {
    return (
      <SpanBottleneckInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsight
        key={insight.type}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (
    isEndpointLowUsageInsight(insight) ||
    isEndpointNormalUsageInsight(insight) ||
    isEndpointHighUsageInsight(insight)
  ) {
    return (
      <TrafficInsight
        key={insight.type}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isCodeObjectErrorsInsight(insight)) {
    return (
      <ErrorsInsight
        key={insight.type}
        insight={insight}
        onErrorSelect={handleErrorSelect}
        onExpandButtonClick={handleErrorsExpandButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isEndpointSuspectedNPlusOneInsight(insight)) {
    return (
      <EndpointNPlusOneInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanNPlusOneInsight(insight)) {
    return (
      <NPlusOneInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
  if (isSpanScalingBadlyInsight(insight)) {
    return (
      <ScalingIssueInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
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
  if (isEndpointDurationSlowdownInsight(insight)) {
    return (
      <DurationSlowdownSourceInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <RequestBreakdownInsight
        key={insight.type}
        insight={insight}
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
      />
    );
  }

  if (isSessionInViewEndpointInsight(insight)) {
    return (
      <SessionInViewInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }

  if (isChattyApiEndpointInsight(insight)) {
    return (
      <ExcessiveAPICallsInsight
        key={insight.type}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={handleRefresh}
      />
    );
  }
};

export const InsightList = (props: InsightListProps) => {
  const [insightGroups, setInsightGroups] = useState<InsightGroup[]>([]);
  const [isAutofixing, setIsAutofixing] = useState(false);
  const theme = useTheme();
  const insightGroupIconColor = getInsightGroupIconColor(theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.assetId, props.environment, props.serviceName]);

  useEffect(() => {
    setInsightGroups(groupInsights(props.insights, props.spans));
  }, [props.insights, props.spans]);

  const handleAddAnnotation = () => {
    window.sendMessageToDigma({
      action: actions.ADD_ANNOTATION,
      payload: {
        methodId: props.assetId
      }
    });
  };

  const handleAutofix = () => {
    if (!isAutofixing) {
      window.sendMessageToDigma({
        action: actions.AUTOFIX_MISSING_DEPENDENCY,
        payload: {
          methodId: props.assetId
        }
      });
    }
    setIsAutofixing(true);
  };

  return (
    <s.Container>
      {insightGroups.map((x) => (
        <s.InsightGroup key={x.name || "__ungrouped"}>
          {x.name && (
            <s.InsightGroupHeader>
              <div>
                {x.icon && <x.icon size={16} color={insightGroupIconColor} />}{" "}
              </div>
              <s.InsightGroupName title={x.name}>{x.name}</s.InsightGroupName>
            </s.InsightGroupHeader>
          )}
          {x.insights.length > 0 ? (
            x.insights.map((insight) => renderInsightCard(insight))
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
          {!props.hasObservability && (
            <NoObservabilityCard
              canInstrumentMethod={props.canInstrumentMethod}
              hasMissingDependency={props.hasMissingDependency}
              onAutofix={handleAutofix}
              onAddAnnotation={handleAddAnnotation}
            />
          )}
        </s.InsightGroup>
      ))}
    </s.Container>
  );
};
