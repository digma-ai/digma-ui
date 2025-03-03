import { getDurationString } from "../../../../../../../utils/getDurationString";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { AssetLink, ContentContainer, Description, Details } from "../styles";
import type { EndpointBottleneckInsightCardProps } from "./types";

export const EndpointBottleneckInsightCard = ({
  insight,
  onAssetLinkClick,
  onJiraTicketCreate,
  onTraceButtonClick,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: EndpointBottleneckInsightCardProps) => {
  const { span, ticketLink } = insight;

  const handleSpanLinkClick = (spanCodeObjectId: string) => () => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
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
              onClick={handleSpanLinkClick(spanCodeObjectId)}
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
            <KeyValue
              label={"Duration"}
              info={"The average duration when being detected as a bottleneck"}
            >
              {durationString}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      onGoToSpan={onGoToSpan}
      onGoToTrace={span.traceId ? handleTraceButtonClick : undefined}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={durationString}>
          <span>{durationString}</span>
        </Tooltip>
      }
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
