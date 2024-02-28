import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { InsightCard } from "../../../../common/v3/InsightCard";
import {
  KeyValue,
  KeyValueContainer
} from "../../../../common/v3/KeyValueContainer";
import { Tag } from "../../../../common/v3/Tag";
import { Description } from "../../../styles";
import * as s from "./styles";
import { SlowEndpointInsightProps } from "./types";

export const SlowEndpointInsight = (props: SlowEndpointInsightProps) => {
  const diff =
    (props.insight.median.raw / props.insight.endpointsMedianOfMedians.raw -
      1) *
    100;

  return (
    <InsightCard
      insight={props.insight}
      content={
        <s.ContentContainer>
          <Description>
            {`On average requests are slower than other endpoints by ${roundTo(
              diff,
              2
            )}%`}
          </Description>
          <KeyValueContainer>
            <KeyValue label={"Slower by"}>
              <Tag content={getDurationString(props.insight.median)} />
            </KeyValue>
          </KeyValueContainer>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
