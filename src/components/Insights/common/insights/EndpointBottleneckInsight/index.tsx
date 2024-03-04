import { getDurationString } from "../../../../../utils/getDurationString";
import { roundTo } from "../../../../../utils/roundTo";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { trackingEvents } from "../../../tracking";
import { Info } from "../../Info";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { EndpointBottleneckInsightProps } from "./types";

export const EndpointBottleneckInsight = (
  props: EndpointBottleneckInsightProps
) => {
  const { insight } = props;
  const { span, ticketLink } = insight;

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  const spanName = span.spanInfo.displayName;
  const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

  return (
    <InsightCard
      insight={insight}
      jiraTicketInfo={{
        isHintEnabled: props.isJiraHintEnabled,
        spanCodeObjectId: props.insight.spanInfo?.spanCodeObjectId,
        ticketLink
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Asset</Description>
            <s.SpanListItem
              name={spanName}
              key={spanName}
              onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue label={"% of Duration"}>
              {roundTo(span.avgFractionWhenBeingBottleneck * 100, 2)}%
            </KeyValue>
            <KeyValue
              label={
                <Info
                  text={"Percentage of request consumed by the bottleneck span"}
                  name={"% of Request"}
                />
              }
            >
              {span.requestPercentage}%
            </KeyValue>
            <KeyValue label={"Duration"}>
              {getDurationString(span.avgDurationWhenBeingBottleneck)}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onJiraButtonClick={handleTicketInfoButtonClick}
    />
  );
};
