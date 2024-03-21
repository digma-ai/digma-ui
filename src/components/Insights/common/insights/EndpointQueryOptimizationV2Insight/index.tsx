import { useContext } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { EndpointQueryOptimizationV2InsightProps } from "./types";

export const EndpointQueryOptimizationV2Insight = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh,
  onGoToSpan
}: EndpointQueryOptimizationV2InsightProps) => {
  const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const name = insight.span.spanInfo.displayName;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Check the following location:</Description>
            <s.SpanListItem
              name={name}
              onClick={() =>
                handleSpanLinkClick(insight.span.spanInfo.spanCodeObjectId)
              }
            ></s.SpanListItem>
          </Details>
          <ColumnsContainer>
            <KeyValue label={"Duration"}>
              {getDurationString(insight.span.duration)}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToTrace={
        config.isJaegerEnabled && insight.span.traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: insight.span.spanInfo.displayName,
                  id: insight.span.traceId
                },
                insight.type,
                insight.span.spanInfo.spanCodeObjectId
              )
          : undefined
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.span.ticketLink,
        spanCodeObjectId: insight.span.spanInfo.spanCodeObjectId,
        isHintEnabled: isJiraHintEnabled
      }}
      onGoToSpan={onGoToSpan}
    />
  );
};
