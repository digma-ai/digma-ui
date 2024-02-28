import { roundTo } from "../../../../../utils/roundTo";
import { Tag } from "../../../../common/v3/Tag";
import { TrafficInsightProps } from "../../../TrafficInsight/types";
import { InsightType } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import * as s from "./styles";

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

export const TrafficInsight = (props: TrafficInsightProps) => {
  const valueString = getValueString(props.insight.maxCallsIn1Min);

  return (
    <InsightCard
      insight={props.insight}
      content={
        <s.ContentContainer>
          <ColumnsContainer>
            <s.Description>{getDescription(props.insight.type)}</s.Description>
            <KeyValue label={"Duration"}>
              <Tag content={`${valueString}/min`} />
            </KeyValue>
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
