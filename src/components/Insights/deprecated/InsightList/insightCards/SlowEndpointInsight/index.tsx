import { getDurationString } from "../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../utils/roundTo";
import { Description } from "../../../../styles";
import { InsightCard } from "../../InsightCard";
import { SlowEndpointInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const SlowEndpointInsight = ({
  insight,
  onRecalculate,
  onRefresh
}: SlowEndpointInsightProps) => {
  const diff =
    (insight.median.raw / insight.endpointsMedianOfMedians.raw - 1) * 100;

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <Description>
          {`On average requests are slower than other endpoints by ${roundTo(
            diff,
            2
          )}%`}
        </Description>
      }
      stats={getDurationString(insight.median)}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
