import { getDurationString } from "../../../utils/getDurationString";
import { roundTo } from "../../../utils/roundTo";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import { SlowEndpointInsightProps } from "./types";

/**
 * @deprecated
 */
export const SlowEndpointInsight = (props: SlowEndpointInsightProps) => {
  const diff =
    (props.insight.median.raw / props.insight.endpointsMedianOfMedians.raw -
      1) *
    100;

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
      content={
        <Description>
          {`On average requests are slower than other endpoints by ${roundTo(
            diff,
            2
          )}%`}
        </Description>
      }
      stats={getDurationString(props.insight.median)}
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
