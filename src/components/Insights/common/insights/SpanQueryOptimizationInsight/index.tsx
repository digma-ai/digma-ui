import { usePagination } from "../../../../../hooks/usePagination";
import { getDurationString } from "../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { Pagination } from "../../../../common/v3/Pagination";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { QueryOptimizationInsightProps } from "./types";

const PAGE_SIZE = 3;

export const SpanQueryOptimizationInsight = (
  props: QueryOptimizationInsightProps
) => {
  const endpoints = props.insight.endpoints || [];
  const [pageItems, page, setPage] = usePagination(
    endpoints,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId &&
      props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

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
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  const spanName = props.insight.spanInfo?.displayName || undefined;
  const spanCodeObjectId =
    props.insight.spanInfo?.spanCodeObjectId || undefined;
  const traceId = props.insight.traceId;

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          {spanCodeObjectId && (
            <Details>
              <Description>
                Query is slow compared to other{" "}
                {props.insight.dbStatement.toUpperCase()} requests
              </Description>
              <ListItem
                name={spanName || ""}
                onClick={() => handleSpanLinkClick(spanCodeObjectId)}
              />
            </Details>
          )}
          <ColumnsContainer>
            <KeyValue label={"Duration"}>
              {getDurationString(props.insight.duration)}
            </KeyValue>
            <KeyValue label={"Typical Duration"}>
              {getDurationString(props.insight.typicalDuration)}
            </KeyValue>
            <KeyValue label={"Database"}>{props.insight.dbName}</KeyValue>
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
                      onClick={() => handleSpanLinkClick(spanCodeObjectId)}
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onJiraButtonClick={handleCreateJiraTicketButtonClick}
      jiraTicketInfo={{
        ticketLink: props.insight.ticketLink,
        isHintEnabled: props.isJiraHintEnabled
      }}
      onGoToTrace={
        traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: spanName,
                  id: traceId
                },
                props.insight.type,
                spanCodeObjectId
              )
          : undefined
      }
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
