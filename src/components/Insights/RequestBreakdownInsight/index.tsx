import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { roundTo } from "../../../utils/roundTo";
import { InsightCard } from "../InsightCard";
import { Component, ComponentType, EndpointBreakdownInsight } from "../types";
import * as s from "./styles";
import { RequestBreakdownInsightProps } from "./types";

const PIE_CHART_RADIUS = 42;
const PIE_CHART_ARC_WIDTH = 4;

const componentTypeColors = {
  [ComponentType.Internal]: "#53aeb4",
  [ComponentType.DbQueries]: "#b180d7",
  [ComponentType.HttpClients]: "#75beff",
  [ComponentType.Rendering]: "#f55385"
};

const DEFAULT_PERCENTILE = 0.5;

const getComponents = (
  insight: EndpointBreakdownInsight,
  percentile: number
): Component[] | undefined => {
  switch (percentile) {
    case 0.5:
      return insight.p50Components || undefined;
    case 0.95:
      return insight.p95Components || undefined;
    default:
      return undefined;
  }
};

export const RequestBreakdownInsight = (
  props: RequestBreakdownInsightProps
) => {
  const [percentileViewMode, setPercentileViewMode] =
    useState<number>(DEFAULT_PERCENTILE);

  const components =
    getComponents(props.insight, percentileViewMode) ||
    props.insight.components;

  const data = [...components].sort((a, b) => b.fraction - a.fraction);

  const handlePercentileViewModeChange = (value: number) => {
    setPercentileViewMode(value);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <s.PieChartContainer>
            <PieChart width={PIE_CHART_RADIUS} height={PIE_CHART_RADIUS}>
              <Pie
                data={data}
                innerRadius={(PIE_CHART_RADIUS - PIE_CHART_ARC_WIDTH) / 2}
                outerRadius={PIE_CHART_RADIUS / 2}
                cornerRadius={PIE_CHART_ARC_WIDTH / 2}
                paddingAngle={1}
                dataKey={"fraction"}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={componentTypeColors[entry.type]}
                    stroke={"none"}
                  />
                ))}
              </Pie>
            </PieChart>
          </s.PieChartContainer>
          <s.Legend>
            {data.map((x) => (
              <s.LegendItem key={x.type}>
                <s.LegendItemDataColor color={componentTypeColors[x.type]} />
                <s.LegendItemDataLabel>{x.type}</s.LegendItemDataLabel>
                <s.LegendItemDataValue>
                  {roundTo(x.fraction * 100, 2)}%
                </s.LegendItemDataValue>
              </s.LegendItem>
            ))}
          </s.Legend>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onPercentileViewModeChange={
        props.insight.p50Components && props.insight.p95Components
          ? handlePercentileViewModeChange
          : undefined
      }
    />
  );
};
