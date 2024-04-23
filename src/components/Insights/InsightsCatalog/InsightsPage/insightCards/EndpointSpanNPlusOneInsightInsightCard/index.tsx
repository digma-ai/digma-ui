import { getDurationString } from "../../../../../../utils/getDurationString";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { AssetLink } from "../common/InsightCard/AssetLink";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import { EndpointSpanNPlusOneInsightCardProps } from "./types";

export const EndpointSpanNPlusOneInsightCard = ({
  insight,
  onAssetLinkClick,
  onJiraTicketCreate,
  onTraceButtonClick,
  isJiraHintEnabled,
  onRecalculate,
  onGoToSpan,
  onRefresh,
  isMarkAsReadButtonEnabled
}: EndpointSpanNPlusOneInsightCardProps) => {
  const { span } = insight;

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

  const spanInfo = span.internalSpan || span.clientSpan;
  const spanName = spanInfo.displayName;

  return (
    <InsightCard
      insight={insight}
      onJiraButtonClick={handleTicketInfoButtonClick}
      onGoToTrace={() =>
        handleTraceButtonClick(
          {
            name: spanName,
            id: span.traceId
          },
          insight.type,
          spanInfo.spanCodeObjectId
        )
      }
      jiraTicketInfo={{
        ticketLink: span.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Asset</Description>
            <AssetLink
              text={spanName}
              onClick={() => handleSpanLinkClick(spanInfo.spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue label={"Repeats"}>{span.occurrences}</KeyValue>
            <KeyValue
              label={"Requests"}
              info={"The amount of requests affected by this issue."}
            >
              {span.requestPercentage}%
            </KeyValue>
            <KeyValue label={"Duration"}>
              {getDurationString(span.duration)}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
