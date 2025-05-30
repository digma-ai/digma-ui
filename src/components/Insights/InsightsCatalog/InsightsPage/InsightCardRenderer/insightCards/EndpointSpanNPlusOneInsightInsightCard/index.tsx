import type { InsightType } from "../../../../../../../types";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type { Trace } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { AssetLink, ContentContainer, Description, Details } from "../styles";
import type { EndpointSpanNPlusOneInsightCardProps } from "./types";

export const EndpointSpanNPlusOneInsightCard = ({
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
}: EndpointSpanNPlusOneInsightCardProps) => {
  const { span } = insight;

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

  const handleTraceButtonClick =
    (trace: Trace, insightType: InsightType, spanCodeObjectId: string) =>
    () => {
      onTraceButtonClick(trace, insightType, spanCodeObjectId);
    };

  const spanInfo = span.internalSpan ?? span.clientSpan;
  const spanName = spanInfo.displayName;
  const durationString = getDurationString(span.duration);

  return (
    <InsightCard
      insight={insight}
      onJiraButtonClick={handleTicketInfoButtonClick}
      onGoToTrace={handleTraceButtonClick(
        {
          name: spanName,
          id: span.traceId
        },
        insight.type,
        spanInfo.spanCodeObjectId
      )}
      jiraTicketInfo={{
        ticketLink: span.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>Asset</Description>
            <AssetLink
              name={spanName}
              onClick={handleSpanLinkClick(spanInfo.spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue
              label={"Repeats"}
              info={
                "The median number of times this query repeats in each requests"
              }
            >
              {span.occurrences}
            </KeyValue>
            <KeyValue
              label={"Requests"}
              info={"The amount of requests affected by this issue"}
            >
              {span.requestPercentage}%
            </KeyValue>
            <KeyValue
              label={"Duration"}
              info={"The execution time of the last group of queries"}
            >
              {durationString}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onGoToSpan={onGoToSpan}
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
