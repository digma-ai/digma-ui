import { getDurationString } from "../../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../../utils/roundTo";
import { Tag } from "../../../../../../common/v3/Tag";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description } from "../styles";
import type { SpanPerformanceAnomalyInsightCardProps } from "./types";

export const SpanPerformanceAnomalyInsightCard = ({
  insight,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef,
  onTraceButtonClick,
  onHistogramButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled
}: SpanPerformanceAnomalyInsightCardProps) => {
  const p50DurationString = getDurationString(insight.p50);
  const p95DurationString = getDurationString(insight.p95);

  const goToTrace = (traceId: string) => {
    onTraceButtonClick(
      {
        name: insight.spanInfo?.displayName,
        id: traceId
      },
      insight.type,
      insight.spanInfo?.spanCodeObjectId
    );
  };

  const handleGoToP50Trace = () => {
    if (!insight.p50TraceId) {
      return;
    }
    goToTrace(insight.p50TraceId);
  };

  const handleGoToP95Trace = () => {
    if (!insight.p95TraceId) {
      return;
    }
    goToTrace(insight.p95TraceId);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Description>
            The slowest 5% of this asset is{" "}
            {roundTo(insight.slowerByPercentage, 2)}% slower than the median
          </Description>
          <ColumnsContainer>
            <KeyValue label={"Median"}>
              <Tag content={p50DurationString} title={p50DurationString} />
            </KeyValue>
            <KeyValue label={"Slowest 5%"}>
              <Tag content={p95DurationString} title={p95DurationString} />
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
      onGoToP50Trace={insight.p50TraceId ? handleGoToP50Trace : undefined}
      onGoToP95Trace={insight.p95TraceId ? handleGoToP95Trace : undefined}
      onOpenHistogram={onHistogramButtonClick}
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        spanCodeObjectId: insight.spanInfo?.spanCodeObjectId,
        isHintEnabled: isJiraHintEnabled
      }}
    />
  );
};
