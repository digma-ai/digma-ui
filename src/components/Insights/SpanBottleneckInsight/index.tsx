import { getDurationString } from "../../../utils/getDurationString";
import { roundTo } from "../../../utils/roundTo";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Tooltip } from "../../common/Tooltip";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import { Description, Link } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { SpanBottleneckInsightProps } from "./types";

export const SpanBottleneckInsight = (props: SpanBottleneckInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
      content={
        <>
          <Description>
            The following spans are slowing request handling
          </Description>
          <s.Container>
            <s.SpanList>
              {props.insight.spans.map((span, i) => {
                const spanName = span.spanInfo.displayName;
                const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

                return (
                  <s.Span key={spanCodeObjectId}>
                    <s.SpanDetails>
                      <Tooltip title={spanName}>
                        <s.SpanName>
                          <Link
                            onClick={() =>
                              handleSpanLinkClick(spanCodeObjectId)
                            }
                          >
                            {spanName}
                          </Link>
                        </s.SpanName>
                      </Tooltip>
                      <Description>
                        <Criticality value={span.criticality} />
                        <span>
                          {`Slowing ${roundTo(
                            span.probabilityOfBeingBottleneck * 100,
                            2
                          )}% of the requests (~${getDurationString(
                            span.avgDurationWhenBeingBottleneck
                          )})`}
                        </span>
                      </Description>
                    </s.SpanDetails>
                    <s.ButtonsContainer>
                      <JiraButton
                        onTicketInfoButtonClick={handleTicketInfoButtonClick}
                        spanCodeObjectId={spanCodeObjectId}
                        ticketLink={span.ticketLink}
                        buttonType={"small"}
                        isHintEnabled={props.isJiraHintEnabled && i === 0}
                      />
                    </s.ButtonsContainer>
                  </s.Span>
                );
              })}
            </s.SpanList>
          </s.Container>
        </>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
