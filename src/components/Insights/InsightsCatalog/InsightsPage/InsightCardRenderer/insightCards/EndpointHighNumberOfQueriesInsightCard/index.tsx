import type { InsightType } from "../../../../../../../types";
import { Tag } from "../../../../../../common/v3/Tag";
import type { Trace } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description } from "../styles";
import type { EndpointHighNumberOfQueriesInsightCardProps } from "./types";

export const EndpointHighNumberOfQueriesInsightCard = ({
  insight,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: EndpointHighNumberOfQueriesInsightCardProps) => {
  const traceId = insight.traceId;

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
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
          {insight.quantile === 0.95 && (
            <Description>Affecting the slowest 5% of requests.</Description>
          )}
          <ColumnsContainer>
            <KeyValue label={"# of Queries"}>
              <Tag
                type={"mediumSeverity"}
                content={insight.queriesCount}
                title={insight.queriesCount}
              />
            </KeyValue>
            <KeyValue
              label={"Typical"}
              info={"Typical number of queries for endpoints in this service"}
            >
              <Tag
                content={insight.typicalCount}
                title={insight.typicalCount}
              />
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      onGoToTrace={
        traceId
          ? () =>
              handleTraceButtonClick(
                {
                  id: traceId,
                  name: insight.spanInfo?.displayName
                },
                insight.type,
                insight.spanInfo?.spanCodeObjectId
              )
          : undefined
      }
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
