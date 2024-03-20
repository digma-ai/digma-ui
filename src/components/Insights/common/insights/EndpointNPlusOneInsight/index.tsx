import { useContext } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { InsightType, Trace } from "../../../types";
import { Info } from "../../Info";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
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
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
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
        isHintEnabled: props.isJiraHintEnabled
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Assets</Description>
            <s.SpanListItem
              name={spanName}
              key={spanName}
              onClick={() => handleSpanLinkClick(spanInfo.spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue label={"Repeats"}>{span.occurrences}</KeyValue>
            <KeyValue
              label={
                <Info
                  text={"The amount of requests affected by this issue."}
                  name={"Requests"}
                />
              }
            >
              {span.requestPercentage}%
            </KeyValue>
            <KeyValue label={"Duration"}>
              {getDurationString(span.duration)}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
