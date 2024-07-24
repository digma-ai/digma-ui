import { usePagination } from "../../../../../../hooks/usePagination";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { Pagination } from "../../../../../common/v3/Pagination";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ListItem } from "../common/InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { SpanQueryOptimizationInsightCardProps } from "./types";

const PAGE_SIZE = 3;

export const SpanQueryOptimizationInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  isJiraHintEnabled,
  onJiraTicketCreate
}: SpanQueryOptimizationInsightCardProps) => {
  const endpoints = insight.endpoints ?? [];
  const [pageItems, page, setPage] = usePagination(
    endpoints,
    PAGE_SIZE,
    insight.id
  );

  const handleAssetLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && onAssetLinkClick(spanCodeObjectId, insight.type);
  };

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

  const spanName = insight.spanInfo?.displayName ?? undefined;
  const spanCodeObjectId = insight.spanInfo?.spanCodeObjectId ?? undefined;
  const traceId = insight.traceId;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <ColumnsContainer>
            <KeyValue label={"Duration"}>
              {getDurationString(insight.duration)}
            </KeyValue>
            <KeyValue label={"Typical Duration"}>
              {getDurationString(insight.typicalDuration)}
            </KeyValue>
            <KeyValue label={"Database"}>{insight.dbName}</KeyValue>
          </ColumnsContainer>
          {endpoints.length > 0 && (
            <>
              <Description>Affected Endpoints ({endpoints.length})</Description>
              <s.EndpointList>
                {pageItems.map((x) => {
                  const spanCodeObjectId = x.endpointInfo.spanCodeObjectId;
                  const route = trimEndpointScheme(x.endpointInfo.route);
                  return (
                    <ListItem
                      name={route}
                      key={route}
                      onClick={() => handleAssetLinkClick(spanCodeObjectId)}
                    />
                  );
                })}
                <Pagination
                  itemsCount={endpoints.length}
                  page={page}
                  pageSize={PAGE_SIZE}
                  onPageChange={setPage}
                  withDescription={true}
                />
              </s.EndpointList>
            </>
          )}
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
                  name: spanName,
                  id: traceId
                },
                insight.type,
                spanCodeObjectId
              )
          : undefined
      }
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
