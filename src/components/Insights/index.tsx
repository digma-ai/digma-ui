import { useEffect, useMemo, useState } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import { dispatcher } from "../../dispatcher";
import { isNumber } from "../../typeGuards/isNumber";
import { InsightType } from "../../types";
import { addPrefix } from "../../utils/addPrefix";
import { getInsightTypeInfo } from "../../utils/getInsightTypeInfo";
import { EndpointIcon } from "../common/icons/EndpointIcon";
import { OpenTelemetryLogoIcon } from "../common/icons/OpenTelemetryLogoIcon";
import { BottleneckInsight } from "./BottleneckInsight";
import { DurationBreakdownInsight } from "./DurationBreakdownInsight";
import { DurationInsight } from "./DurationInsight";
import { DurationSlowdownSourceInsight } from "./DurationSlowdownSourceInsight";
import { EndpointNPlusOneInsight } from "./EndpointNPlusOneInsight";
import { ErrorsInsight } from "./ErrorsInsight";
import { InsightCard } from "./InsightCard";
import { NPlusOneInsight } from "./NPlusOneInsight";
import { NoScalingIssueInsight } from "./NoScalingIssueInsight";
import { PerformanceAtScaleInsight } from "./PerformanceAtScaleInsight";
import { RequestBreakdownInsight } from "./RequestBreakdownInsight";
import { ScalingIssueInsight } from "./ScalingIssueInsight";
import { SlowEndpointInsight } from "./SlowEndpointInsight";
import { SpanBottleneckInsight } from "./SpanBottleneckInsight";
import { TopUsageInsight } from "./TopUsageInsight";
import { TrafficInsight } from "./TrafficInsight";
import * as s from "./styles";
import {
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
} from "./typeGuards";
import {
  EndpointInsight,
  GenericCodeObjectInsight,
  InsightGroup,
  InsightsData,
  InsightsProps,
  SpanInsight,
  Trace
} from "./types";

const REFRESH_INTERVAL = isNumber(window.insightsRefreshInterval)
  ? window.insightsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "INSIGHTS";

const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA",
  GO_TO_ERRORS: "GO_TO_ERRORS",
  GO_TO_ERROR: "GO_TO_ERROR",
  GO_TO_TRACE: "GO_TO_TRACE",
  GO_TO_TRACE_COMPARISON: "GO_TO_TRACE_COMPARISON",
  GO_TO_ASSET: "GO_TO_ASSET",
  OPEN_HISTOGRAM: "OPEN_HISTOGRAM",
  OPEN_LIVE_VIEW: "OPEN_LIVE_VIEW",
  RECALCULATE: "RECALCULATE"
});

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
    spanCodeObjectId: string,
    insightType: string
  ) => {
    window.sendMessageToDigma({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        spanCodeObjectId,
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

  const handleTraceButtonClick = (trace: Trace) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        trace
      }
    });
  };

  const handleCompareButtonClick = (traces: [Trace, Trace]) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE_COMPARISON,
      payload: {
        traces
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

  if (isSpanDurationsInsight(insight)) {
    return (
      <DurationInsight
        key={insight.type}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
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
      />
    );
  }
  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsight
        key={insight.type}
        insight={insight}
        onRecalculate={handleRecalculate}
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
      />
    );
  }
  if (isCodeObjectHotSpotInsight(insight)) {
    return (
      <InsightCard
        key={insight.type}
        data={insight}
        content={
          <s.Description>
            Major errors occur or propagate through this function
          </s.Description>
        }
        onRecalculate={handleRecalculate}
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
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <RequestBreakdownInsight
        key={insight.type}
        insight={insight}
        onRecalculate={handleRecalculate}
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
      />
    );
  }
};

const groupInsights = (
  insights: GenericCodeObjectInsight[]
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

    const spanCodeObjectId = insight.spanInfo?.spanCodeObjectId;

    if (!spanCodeObjectId) {
      ungroupedInsights.push(insight);
      continue;
    }

    if (isEndpointInsight(insight)) {
      if (!endpointInsightGroups[spanCodeObjectId]) {
        endpointInsightGroups[spanCodeObjectId] = [];
      }

      endpointInsightGroups[spanCodeObjectId].push(insight);
      continue;
    }

    if (isSpanInsight(insight)) {
      if (endpointInsightGroups[spanCodeObjectId]) {
        endpointInsightGroups[spanCodeObjectId].push(insight);
        continue;
      }

      if (!spanInsightGroups[spanCodeObjectId]) {
        spanInsightGroups[spanCodeObjectId] = [];
      }

      spanInsightGroups[spanCodeObjectId].push(insight);
    }
  }

  return [
    { insights: ungroupedInsights },
    // Endpoint insight groups
    ...Object.values(endpointInsightGroups)
      .map((x) => ({
        icon: EndpointIcon,
        name: x[0].spanInfo?.displayName,
        insights: x
      }))
      .sort(sortByName),
    // Span insight groups
    ...Object.values(spanInsightGroups)
      .map((x) => ({
        icon: OpenTelemetryLogoIcon,
        name: x[0].spanInfo?.displayName,
        insights: x
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
      return "#dadada";
  }
};

export const Insights = (props: InsightsProps) => {
  const [data, setData] = useState<InsightGroup[]>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const theme = useTheme();
  const insightGroupIconColor = getInsightGroupIconColor(theme);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_DATA
    });

    const handleInsightsData = (data: unknown, timeStamp: number) => {
      setData(
        data ? groupInsights((data as InsightsData).insights) : undefined
      );
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(actions.SET_DATA, handleInsightsData);

    return () => {
      dispatcher.removeActionListener(actions.SET_DATA, handleInsightsData);
    };
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      window.sendMessageToDigma({
        action: actions.GET_DATA
      });
    }, REFRESH_INTERVAL);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [lastSetDataTimeStamp]);

  useEffect(() => {
    if (!props.data) {
      return;
    }

    setData(groupInsights(props.data.insights));
  }, [props.data]);

  const renderContent = useMemo((): JSX.Element => {
    if (!data) {
      return <>No insights</>;
    }

    return (
      <s.InsightsContainer>
        {data.map((x) => (
          <s.InsightGroup key={x.name || "__ungrouped"}>
            {x.name && (
              <s.InsightGroupName>
                {x.icon && <x.icon size={16} color={insightGroupIconColor} />}{" "}
                {x.name}
              </s.InsightGroupName>
            )}
            {x.insights.map((insight) => renderInsightCard(insight))}
          </s.InsightGroup>
        ))}
      </s.InsightsContainer>
    );
  }, [data, insightGroupIconColor]);

  return <s.Container>{renderContent}</s.Container>;
};
