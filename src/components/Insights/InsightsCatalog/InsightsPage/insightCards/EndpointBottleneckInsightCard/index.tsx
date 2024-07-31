import { getDurationString } from "../../../../../../utils/getDurationString";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { AssetLink, ContentContainer, Description, Details } from "../styles";
import { EndpointBottleneckInsightCardProps } from "./types";

export const EndpointBottleneckInsightCard = ({
  insight,
  onAssetLinkClick,
  onJiraTicketCreate,
  onTraceButtonClick,
  isJiraHintEnabled,
  onRecalculate,
  onGoToSpan,
  onRefresh,
  isMarkAsReadButtonEnabled,
  viewMode
}: EndpointBottleneckInsightCardProps) => {
  const { span, ticketLink } = insight;

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = () => {
    if (span.traceId) {
      onTraceButtonClick(
        { id: span.traceId, name: span.spanInfo.name },
        insight.type,
        insight.span.spanInfo.spanCodeObjectId
      );
    }
  };

  const spanName = span.spanInfo.displayName;
  const spanCodeObjectId = span.spanInfo.spanCodeObjectId;
  const durationString = getDurationString(span.avgDurationWhenBeingBottleneck);

  return (
    <InsightCard
      insight={insight}
      jiraTicketInfo={{
        isHintEnabled: isJiraHintEnabled,
        ticketLink
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Asset</Description>
            <AssetLink
              name={spanName}
              onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue
              label={"% of Duration"}
              info={
                "The percentage of the overall request time taken up by this bottleneck asset"
              }
            >
              {span.avgFractionWhenBeingBottleneck}%
            </KeyValue>
            <KeyValue
              label={"% of Requests"}
              info={
                "The percentage of requests for the selected endpoint experiencing this bottleneck"
              }
            >
              {span.requestPercentage}%
            </KeyValue>
            <KeyValue label={"Duration"}>{durationString}</KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onJiraButtonClick={handleTicketInfoButtonClick}
      onGoToSpan={onGoToSpan}
      onGoToTrace={span.traceId ? handleTraceButtonClick : undefined}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={durationString}>
          <>{durationString}</>
        </Tooltip>
      }
    />
  );
};
