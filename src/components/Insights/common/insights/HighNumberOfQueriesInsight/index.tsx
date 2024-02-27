import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { InsightCard } from "../../../../common/v3/InsightCard";
import {
  KeyValue,
  KeyValueContainer
} from "../../../../common/v3/KeyValueContainer";
import { Tag } from "../../../../common/v3/Tag";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { Description } from "../../../styles";
import { trackingEvents } from "../../../tracking";
import { InsightType, Trace } from "../../../types";
import * as s from "./styles";
import { HighNumberOfQueriesInsightProps } from "./types";

export const HighNumberOfQueriesInsight = (
  props: HighNumberOfQueriesInsightProps
) => {
  const { insight } = props;
  const traceId = insight.traceId;

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(insight, undefined, event);
  };

  return (
    <InsightCard
      insight={insight}
      content={
        <s.ContentContainer>
          <Description>
            {insight.quantile === 0.95 &&
              "Affecting the slowest 5% of requests. "}
            Consider using joins or caching responses to reduce database round
            trips
          </Description>
          <KeyValueContainer>
            <KeyValue label={"# of Queries"}>
              <Tag type={"mediumSeverity"} content={insight.queriesCount} />
            </KeyValue>
            <KeyValue
              label={
                <s.TypicalLabel>
                  <span>Typical</span>
                  <Tooltip
                    title={
                      "Typical number of queries for endpoints in this service"
                    }
                  >
                    <s.IconContainer>
                      <InfoCircleIcon color={"currentColor"} />
                    </s.IconContainer>
                  </Tooltip>
                </s.TypicalLabel>
              }
            >
              <Tag content={insight.typicalCount} />
            </KeyValue>

            <KeyValue label={"Duration"}>
              {props.insight.medianDuration.value.toString() +
                props.insight.medianDuration.unit}
            </KeyValue>
          </KeyValueContainer>
          {/* <s.Stat>
              <s.Key>Actions</s.Key>
              <s.ActionsContainer>
                <JiraButton
                  onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                  spanCodeObjectId={insight.spanInfo?.spanCodeObjectId}
                  ticketLink={insight.ticketLink}
                  buttonType={"small"}
                  isHintEnabled={props.isJiraHintEnabled}
                />
              </s.ActionsContainer>
            </s.Stat> */}
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToTrace={
        traceId
          ? () =>
              handleTraceButtonClick(
                {
                  id: traceId,
                  name: insight.spanInfo?.displayName
                },
                insight.type,
                insight.spanInfo?.spanCodeObjectId
              )
          : undefined
      }
    />
  );
};
