import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Button } from "../../common/Button";
import { Tag } from "../../common/Tag";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InfoCircleIcon } from "../../common/icons/InfoCircleIcon";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import { Description } from "../styles";
import { trackingEvents } from "../tracking";
import { Trace } from "../types";
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

  const handleCreateJiraTicketButtonClick = () => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(insight, insight.spanInfo?.spanCodeObjectId);
  };

  return (
    <InsightCard
      data={insight}
      content={
        <s.ContentContainer>
          <Description>
            {insight.quantile === 0.95 &&
              "Affecting the slowest 5% of requests. "}
            Consider using joins or caching responses to reduce database round
            trips
          </Description>
          <s.Stats>
            <Criticality value={insight.criticality} />
          </s.Stats>
          <s.Stats>
            <s.Stat>
              <s.Key># of Queries</s.Key>
              <Tag type={"mediumSeverity"} value={insight.queriesCount} />
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
              <Tag value={insight.typicalCount} />
            </s.Stat>
            <s.Stat>
              <s.Key>Actions</s.Key>
              <s.ActionsContainer>
                <JiraButton
                  onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                  spanCodeObjectId={insight.spanInfo?.spanCodeObjectId}
                  ticketLink={insight.ticketLink}
                  buttonType="small"
                />
                {traceId && (
                  <Tooltip title={"Trace"}>
                    <Button
                      icon={{ component: CrosshairIcon }}
                      onClick={() =>
                        handleTraceButtonClick(
                          {
                            id: traceId,
                            name: insight.spanInfo?.displayName
                          },
                          insight.type,
                          insight.spanInfo?.spanCodeObjectId
                        )
                      }
                    />
                  </Tooltip>
                )}
              </s.ActionsContainer>
            </s.Stat>
          </s.Stats>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
