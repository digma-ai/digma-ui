import { getDurationString } from "../../../../../utils/getDurationString";
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
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = () => {
    if (span.traceId) {
      props.onTraceButtonClick(
        { id: span.traceId, name: span.spanInfo.name },
        insight.type,
        insight.span.spanInfo.spanCodeObjectId
      );
    }
  };

  const spanName = span.spanInfo.displayName;
  const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

  return (
    <InsightCard
      insight={insight}
      jiraTicketInfo={{
        isHintEnabled: props.isJiraHintEnabled,
        ticketLink
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Asset</Description>
            <s.SpanListItem
              name={spanName}
              onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue
              label={
                <Info
                  text={
                    "The percentage of the overall request time taken up by this bottleneck asset"
                  }
                  name={"% of Duration"}
                />
              }
            >
              {span.avgFractionWhenBeingBottleneck}%
            </KeyValue>
            <KeyValue
              label={
                <Info
                  text={
                    "The percentage of requests for the selected endpoint experiencing this bottleneck"
                  }
                  name={"% of Requests"}
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
      onGoToSpan={props.onGoToSpan}
      onGoToTrace={span.traceId ? handleTraceButtonClick : undefined}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
