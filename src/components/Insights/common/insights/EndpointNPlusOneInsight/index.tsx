import { useContext } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { trackingEvents } from "../../../tracking";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import * as s from "./styles";
import { EndpointNPlusOneInsightProps } from "./types";

export const EndpointNPlusOneInsight = (
  props: EndpointNPlusOneInsightProps
) => {
  const config = useContext(ConfigContext);
  const { span } = props.insight;

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

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const spanInfo = span.internalSpan || span.clientSpan;
  const spanName = spanInfo.displayName;

  return (
    <InsightCard
      insight={props.insight}
      onJiraButtonClick={handleTicketInfoButtonClick}
      onGoToTrace={
        config.isJaegerEnabled
          ? () =>
              handleTraceButtonClick(
                {
                  name: spanName,
                  id: span.traceId
                },
                props.insight.type,
                spanInfo.spanCodeObjectId
              )
          : undefined
      }
      jiraTicketInfo={{
        ticketLink: span.ticketLink,
        isHintEnabled: props.isJiraHintEnabled,
        spanCodeObjectId: spanInfo.spanCodeObjectId
      }}
      content={
        <s.ContentContainer>
          <s.SpanList>
            <s.Description>Assets</s.Description>
            <ListItem
              name={spanName}
              key={spanName}
              onClick={() => handleSpanLinkClick(spanInfo.spanCodeObjectId)}
            />
          </s.SpanList>
          <ColumnsContainer>
            <KeyValue label={"Repeats"}>{span.occurrences}</KeyValue>
            <KeyValue label={"Requests"}>{span.requestPercentage}</KeyValue>
            <KeyValue label={"Duration"}>
              {getDurationString(span.duration)}
            </KeyValue>
          </ColumnsContainer>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
