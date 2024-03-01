import { useContext } from "react";
import { usePagination } from "../../../../../hooks/usePagination";
import { getDurationString } from "../../../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { TraceIcon } from "../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../common/v3/Button";
import { JiraButton } from "../../../../common/v3/JiraButton";
import { Pagination } from "../../../../common/v3/Pagination";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { InsightType, RootCauseSpanInfo, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { ScalingIssueInsightProps } from "./types";

const PAGE_SIZE = 3;
export const ScalingIssueInsight = (props: ScalingIssueInsightProps) => {
  const config = useContext(ConfigContext);
  const [pageItems, page, setPage] = usePagination(
    props.insight.affectedEndpoints,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });

    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  const renderRootCause = (rootCauseSpans: RootCauseSpanInfo[]) => {
    if (rootCauseSpans.length > 0) {
      return (
        <s.List>
          <Description>Caused by:</Description>
          {rootCauseSpans.map((span, i) => {
            const spanName = span.displayName;
            const traceId = span.sampleTraceId;
            const spanCodeObjectId = span.spanCodeObjectId;

            const buttons = [
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={spanCodeObjectId}
                ticketLink={props.insight.ticketLink}
                isHintEnabled={props.isJiraHintEnabled && i === 0}
              />
            ];

            if (config.isJaegerEnabled && traceId) {
              buttons.push(
                <Button
                  key={"trace"}
                  icon={TraceIcon}
                  onClick={() =>
                    handleTraceButtonClick(
                      {
                        name: spanName,
                        id: traceId
                      },
                      props.insight.type,
                      spanCodeObjectId
                    )
                  }
                ></Button>
              );
            }
            return (
              <s.RootCause key={spanCodeObjectId}>
                <Tooltip title={spanName}>
                  <ListItem
                    name={spanName}
                    onClick={() => handleLinkClick(spanCodeObjectId)}
                    buttons={buttons}
                  />
                </Tooltip>
              </s.RootCause>
            );
          })}
        </s.List>
      );
    }
  };

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <s.InsightDescription>
            {props.insight.shortDisplayInfo.description}
          </s.InsightDescription>
          <ColumnsContainer>
            <KeyValue label={"Tested concurrency"}>
              {props.insight.maxConcurrency}
            </KeyValue>
            <KeyValue label={"Duration"}>
              {getDurationString(props.insight.minDuration)} -{" "}
              {getDurationString(props.insight.maxDuration)}
            </KeyValue>
          </ColumnsContainer>
          {renderRootCause(props.insight.rootCauseSpans)}
          {props.insight.affectedEndpoints.length > 0 && (
            <s.List>
              <Description>Affected endpoints:</Description>
              {props.insight.affectedEndpoints.length > 0 &&
                pageItems.map((endpoint) => {
                  const endpointRoute = trimEndpointScheme(endpoint.route);
                  return (
                    <Tooltip title={endpointRoute} key={endpoint.route}>
                      <s.EndpointListItem
                        key={endpoint.spanCodeObjectId}
                        onClick={() =>
                          handleLinkClick(endpoint.spanCodeObjectId)
                        }
                        name={endpointRoute}
                      />
                    </Tooltip>
                  );
                })}
              <Pagination
                itemsCount={props.insight.affectedEndpoints.length}
                page={page}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
                withDescription={true}
              />
            </s.List>
          )}
        </ContentContainer>
      }
      jiraTicketInfo={{
        ticketLink: props.insight.ticketLink,
        isHintEnabled: props.isJiraHintEnabled,
        spanCodeObjectId: props.insight.spanInfo?.spanCodeObjectId
      }}
      onJiraButtonClick={
        props.insight.rootCauseSpans.length == 0
          ? handleCreateJiraTicketButtonClick
          : undefined
      }
      onOpenHistogram={
        props.insight.spanInfo ? props.onHistogramButtonClick : undefined
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};