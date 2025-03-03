import { convertToDuration } from "../../../../../../../utils/convertToDuration";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../../utils/roundTo";
import { Tag } from "../../../../../../common/v3/Tag";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import * as s from "./styles";
import type { SlowEndpointInsightCardProps } from "./types";

export const SlowEndpointInsightCard = ({
  insight,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: SlowEndpointInsightCardProps) => {
  const diff =
    (insight.median.raw / insight.endpointsMedianOfMedians.raw - 1) * 100;

  const slowerByDurationString = getDurationString(
    convertToDuration(insight.median.raw - insight.endpointsMedianOfMedians.raw)
  );

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
              <Tag
                content={slowerByDurationString}
                title={slowerByDurationString}
              />
            </KeyValue>
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={slowerByDurationString}>
          <span>{slowerByDurationString}</span>
        </Tooltip>
      }
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
