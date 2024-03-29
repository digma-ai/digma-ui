import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { Tag } from "../../../../common/v3/Tag";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { HighNumberOfQueriesInsightProps } from "./types";

export const HighNumberOfQueriesInsight = (
  props: HighNumberOfQueriesInsightProps
) => {
  const { insight } = props;
  const traceId = insight.traceId;

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(insight, spanCodeObjectId, event);
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onJiraButtonClick={handleCreateJiraTicketButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: props.isJiraHintEnabled
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
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
