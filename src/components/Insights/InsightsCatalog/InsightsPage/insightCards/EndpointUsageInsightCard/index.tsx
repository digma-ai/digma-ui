import { roundTo } from "../../../../../../utils/roundTo";
import { Tag } from "../../../../../common/v3/Tag";
import { InsightType } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import * as s from "./styles";
import { EndpointUsageInsightCardProps } from "./types";

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

export const EndpointUsageInsightCard = ({
  insight,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: EndpointUsageInsightCardProps) => {
  const valueString = `${getValueString(insight.maxCallsIn1Min)}/min`;

  return (
    <InsightCard
      insight={insight}
      content={
        <s.ContentContainer>
          <ColumnsContainer>
            <s.DescriptionColumn label={"Description"}>
              {getDescription(insight.type)}
            </s.DescriptionColumn>
            <KeyValue label={"Throughput"}>
              <Tag content={valueString} title={valueString} />
            </KeyValue>
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
