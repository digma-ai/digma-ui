import { InsightType } from "../../../types";
import { roundTo } from "../../../utils/roundTo";
import { Button } from "../../common/Button";
import { Tag } from "../../common/Tag";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { HighNumberOfQueriesInsightProps } from "./types";

export const HighNumberOfQueriesInsight = (
  props: HighNumberOfQueriesInsightProps
) => {
  const traceId = props.insight.traceId;
  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>
            Consider using joins or caching responses to reduce database round
            trips
          </Description>
          <s.Stats>
            <s.Stat>
              <s.Key># of Queries</s.Key>
              <Tag type={"mediumSeverity"} value={props.insight.queriesCount} />
            </s.Stat>
            <s.Stat>
              <s.KeyContainer>
                <s.Key>Typical</s.Key>
                <Tooltip
                  title={
                    "Typical number of queries for endpoints in this service"
                  }
                >
                  <s.IconContainer>
                    <InfoCircleIcon color={"currentColor"} />
                  </s.IconContainer>
                </Tooltip>
              </s.KeyContainer>
              <Tag value={props.insight.typicalCount} />
            </s.Stat>
            <s.Stat>
              <s.Key>Median time</s.Key>
              <Tag
                type={"mediumSeverity"}
                value={`${props.insight.medianDuration.value} ${props.insight.medianDuration.unit}`}
              />
            </s.Stat>
            {traceId && (
              <s.Stat>
                <s.Key>Actions</s.Key>
                <Tooltip title={"Trace"}>
                  <Button
                    icon={{ component: CrosshairIcon }}
                    onClick={() =>
                      handleTraceButtonClick(
                        {
                          id: traceId,
                          name: props.insight.spanInfo?.displayName
                        },
                        props.insight.type,
                        props.insight.spanInfo?.spanCodeObjectId
                      )
                    }
                  />
                </Tooltip>
              </s.Stat>
            )}
          </s.Stats>
          <Description>
            % of Entire Request: {roundTo(props.insight.requestFraction, 2)}%
          </Description>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
