import { getDurationString } from "../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../utils/roundTo";
import { Tag } from "../../../../../common/v3/Tag";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import * as s from "./styles";
import type { SlowEndpointInsightCardProps } from "./types";

export const SlowEndpointInsightCard = ({
  insight,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode
}: SlowEndpointInsightCardProps) => {
  const diff =
    (insight.median.raw / insight.endpointsMedianOfMedians.raw - 1) * 100;

  const durationString = getDurationString(insight.median);

  return (
    <InsightCard
      insight={insight}
      content={
        <s.ContentContainer>
          <ColumnsContainer>
            <s.DescriptionColumn label={"Description"}>
              On average requests are slower than other endpoints by{" "}
              {roundTo(diff, 2)}%
            </s.DescriptionColumn>
            <KeyValue label={"Slower by"}>
              <Tag content={durationString} title={durationString} />
            </KeyValue>
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={durationString}>
          <span>{durationString}</span>
        </Tooltip>
      }
    />
  );
};
