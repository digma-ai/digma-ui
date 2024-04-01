import { InfoCircleIcon } from "../../../../../common/icons/InfoCircleIcon";
import { Tag } from "../../../../../common/v3/Tag";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { EndpointHighNumberOfQueriesInsightCardProps } from "./types";

export const EndpointHighNumberOfQueriesInsightCard = ({
  insight,
  onTraceButtonClick,
  onJiraTicketCreate,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled
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
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
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
              <Tag type={"mediumSeverity"} content={insight.queriesCount} />
            </KeyValue>
            <KeyValue
              label={
                <s.TypicalLabel>
                  <span>Typical</span>
                  <Tooltip
                    title={
                      "Typical number of queries for endpoints in this service"
                    }
                  >
                    <s.IconContainer>
                      <InfoCircleIcon color={"currentColor"} />
                    </s.IconContainer>
                  </Tooltip>
                </s.TypicalLabel>
              }
            >
              <Tag content={insight.typicalCount} />
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
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
    />
  );
};
