import { roundTo } from "../../../utils/roundTo";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Tooltip } from "../../common/Tooltip";
import { InsightCard } from "../InsightCard";
import { JiraButton } from "../common/JiraButton";
import { Description, Link } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { SpanBottleneckInsightProps } from "./types";

export const SpanBottleneckInsight = (props: SpanBottleneckInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTicketInfoButtonClick = (spanCodeObjectId: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <>
          <Description>
            The following spans are slowing request handling
          </Description>
          <s.SpanList>
            {props.insight.spans.map((span) => {
              const spanName = span.spanInfo.displayName;
              const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

              return (
                <s.Span key={spanCodeObjectId}>
                  <s.SpanDetails>
                    <Tooltip title={spanName}>
                      <s.SpanName>
                        <Link
                          onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                        >
                          {spanName}
                        </Link>
                      </s.SpanName>
                    </Tooltip>
                    <Description>
                      {`Slowing ${roundTo(
                        span.probabilityOfBeingBottleneck * 100,
                        2
                      )}% of the requests (~${
                        span.avgDurationWhenBeingBottleneck.value
                      } ${span.avgDurationWhenBeingBottleneck.unit})`}
                    </Description>
                  </s.SpanDetails>
                  <s.ButtonsContainer>
                    <JiraButton
                      handleTicketInfoButtonClick={handleTicketInfoButtonClick}
                      spanCodeObjectId={spanCodeObjectId}
                      ticketLink={span.ticketLink}
                    />
                  </s.ButtonsContainer>
                </s.Span>
              );
            })}
          </s.SpanList>
        </>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
