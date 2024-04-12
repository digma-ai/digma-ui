import { InsightType } from "../../../../../../types";
import { roundTo } from "../../../../../../utils/roundTo";
import { Description } from "../../../../styles";
import { InsightCard } from "../../InsightCard";
import { TrafficInsightProps } from "./types";

const suffixes = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" }
];

const getValueString = (requestCount: number): string => {
  const suffix = [...suffixes]
    .reverse()
    .find((suffix) => requestCount >= suffix.value);

  if (suffix) {
    return `~${roundTo(requestCount / suffix.value, 2)}${suffix.symbol}`;
  }

  return `~${roundTo(requestCount, 2)}`;
};

const getDescription = (insightType: InsightType): string => {
  switch (insightType) {
    case InsightType.LowUsage:
      return "Servicing a low number of requests";
    case InsightType.NormalUsage:
      return "Servicing an average number of requests";
    case InsightType.HighUsage:
      return "Servicing a high number of requests";
    default:
      return "";
  }
};

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const TrafficInsight = (props: TrafficInsightProps) => {
  const valueString = getValueString(props.insight.maxCallsIn1Min);

  return (
    <InsightCard
      spanInfo={props.insight.spanInfo}
      data={props.insight}
      content={<Description>{getDescription(props.insight.type)}</Description>}
      stats={`${valueString}/min`}
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
