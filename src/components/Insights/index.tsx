import { useEffect, useMemo, useState } from "react";
import { dispatcher } from "../../dispatcher";
import { isNumber } from "../../typeGuards/isNumber";
import { InsightType } from "../../types";
import { addPrefix } from "../../utils/addPrefix";
import { getInsightTypeInfo } from "../../utils/getInsightTypeInfo";
import { OpenTelemetryLogoIcon } from "../common/icons/OpenTelemetryLogoIcon";
import { BottleneckInsight } from "./BottleneckInsight";
import { DurationBreakdownInsight } from "./DurationBreakdownInsight";
import { DurationInsight } from "./DurationInsight";
import { DurationSlowdownSourceInsight } from "./DurationSlowdownSourceInsight";
import { EndpointNPlusOneInsight } from "./EndpointNPlusOneInsight";
import { ErrorsInsight } from "./ErrorsInsight";
import { InsightCard } from "./InsightCard";
import { NPlusOneInsight } from "./NPlusOneInsight";
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
  isSpanUsagesInsight
} from "./typeGuards";
import {
  GenericCodeObjectInsight,
  InsightGroup,
  InsightsData,
  InsightsProps,
  SpanInsight
} from "./types";

const REFRESH_INTERVAL = isNumber(window.insightsRefreshInterval)
  ? window.insightsRefreshInterval
  : 10 * 1000; // in milliseconds

const ACTION_PREFIX = "INSIGHTS";

const actions = addPrefix(ACTION_PREFIX, {
  GET_DATA: "GET_DATA",
  SET_DATA: "SET_DATA"
});

export const getInsightTypeOrderPriority = (type: string): number => {
  const insightOrderPriorityMap: Record<string, number> = {
    [InsightType.HotSpot]: 1,
    [InsightType.Errors]: 2,
    [InsightType.TopErrorFlows]: 3,

    [InsightType.SpanDurations]: 60,
    [InsightType.SpanUsages]: 61,
    [InsightType.SpanScalingBadly]: 63,
    [InsightType.SpanNPlusOne]: 65,
    [InsightType.SpanDurationChange]: 66,
    [InsightType.SpanEndpointBottleneck]: 67,
    [InsightType.SpanDurationBreakdown]: 68,

    [InsightType.EndpointSpanNPlusOne]: 55,
    [InsightType.SlowestSpans]: 40,
    [InsightType.LowUsage]: 30,
    [InsightType.NormalUsage]: 50,
    [InsightType.HighUsage]: 10,
    [InsightType.SlowEndpoint]: 20,
    [InsightType.EndpointDurationSlowdown]: 25,
    [InsightType.EndpointBreakdown]: 5
  };

  return insightOrderPriorityMap[type] || Infinity;
};

const renderInsightCard = (
  insight: GenericCodeObjectInsight
): JSX.Element | undefined => {
  if (isSpanDurationsInsight(insight)) {
    return <DurationInsight key={insight.type} insight={insight} />;
  }
  if (isSpanDurationBreakdownInsight(insight)) {
    return <DurationBreakdownInsight key={insight.type} insight={insight} />;
  }
  if (isSpanUsagesInsight(insight)) {
    return <TopUsageInsight key={insight.type} insight={insight} />;
  }
  if (isSpanEndpointBottleneckInsight(insight)) {
    return <BottleneckInsight key={insight.type} insight={insight} />;
  }
  if (isEndpointSlowestSpansInsight(insight)) {
    return <SpanBottleneckInsight key={insight.type} insight={insight} />;
  }
  if (isSlowEndpointInsight(insight)) {
    return <SlowEndpointInsight key={insight.type} insight={insight} />;
  }
  if (
    isEndpointLowUsageInsight(insight) ||
    isEndpointNormalUsageInsight(insight) ||
    isEndpointHighUsageInsight(insight)
  ) {
    return <TrafficInsight key={insight.type} insight={insight} />;
  }
  if (isCodeObjectErrorsInsight(insight)) {
    return <ErrorsInsight key={insight.type} insight={insight} />;
  }
  if (isEndpointSuspectedNPlusOneInsight(insight)) {
    return <EndpointNPlusOneInsight key={insight.type} insight={insight} />;
  }
  if (isSpanNPlusOneInsight(insight)) {
    return <NPlusOneInsight key={insight.type} insight={insight} />;
  }
  if (isSpanScalingBadlyInsight(insight)) {
    return <ScalingIssueInsight key={insight.type} insight={insight} />;
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
      />
    );
  }
  if (isEndpointDurationSlowdownInsight(insight)) {
    return (
      <DurationSlowdownSourceInsight key={insight.type} insight={insight} />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return <RequestBreakdownInsight key={insight.type} insight={insight} />;
  }
};

const groupInsights = (
  insights: GenericCodeObjectInsight[]
): InsightGroup[] => {
  const sortedInsights = [...insights].sort(
    (a, b) =>
      getInsightTypeOrderPriority(a.type) - getInsightTypeOrderPriority(b.type)
  );

  const ungroupedInsights: GenericCodeObjectInsight[] = [];
  const spanInsightGroups: { [key: string]: SpanInsight[] } = {};

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

    if (!isSpanInsight(insight)) {
      ungroupedInsights.push(insight);
      continue;
    }

    const spanCodeObjectId = insight.spanInfo?.spanCodeObjectId;

    if (
      !spanCodeObjectId
      // ||
      // spanCodeObjectId === props.assetEntry.span.spanCodeObjectId
    ) {
      ungroupedInsights.push(insight);
      continue;
    }

    if (!spanInsightGroups[spanCodeObjectId]) {
      spanInsightGroups[spanCodeObjectId] = [];
    }

    spanInsightGroups[spanCodeObjectId].push(insight);
  }

  return [
    { insights: ungroupedInsights },
    // span insight groups
    ...Object.values(spanInsightGroups).map((x) => ({
      icon: OpenTelemetryLogoIcon,
      name: x[0].spanInfo?.displayName,
      insights: x
    }))
  ];
};

export const Insights = (props: InsightsProps) => {
  const [data, setData] = useState<InsightGroup[]>();
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();

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
                {x.icon && <x.icon size={16} />} {x.name}
              </s.InsightGroupName>
            )}
            {x.insights.map((insight) => renderInsightCard(insight))}
          </s.InsightGroup>
        ))}
      </s.InsightsContainer>
    );
  }, [data]);

  return <s.Container>{renderContent}</s.Container>;
};
