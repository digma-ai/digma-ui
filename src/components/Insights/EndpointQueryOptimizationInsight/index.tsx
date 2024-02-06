import { useContext } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { InsightType } from "../../../types";
import { getDurationString } from "../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Button } from "../../common/Button";
import { Pagination } from "../../common/Pagination";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import { Description, Link } from "../styles";
import { trackingEvents } from "../tracking";
import { Trace } from "../types";
import * as s from "./styles";
import { EndpointQueryOptimizationInsightProps } from "./types";

const PAGE_SIZE = 3;

export const EndpointQueryOptimizationInsight = (
  props: EndpointQueryOptimizationInsightProps
) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.spans,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTicketInfoButtonClick = (spanCodeObjectId: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>Check the following locations:</Description>
          <s.SpanList>
            {pageItems.map((span) => {
              const spanInfo = span.spanInfo;
              const spanName = spanInfo?.displayName;

              return (
                <s.Span key={spanName}>
                  <s.SpanDetails>
                    <Tooltip title={spanName}>
                      <s.SpanName>
                        <Link
                          onClick={() =>
                            handleSpanLinkClick(spanInfo.spanCodeObjectId)
                          }
                        >
                          {spanName}
                        </Link>
                      </s.SpanName>
                    </Tooltip>
                    <s.Stats>
                      <s.Stat>
                        <Criticality value={span.criticality} />
                      </s.Stat>
                      <s.Stat>
                        <Description>Duration</Description>
                        <span>{getDurationString(span.duration)}</span>
                      </s.Stat>
                    </s.Stats>
                  </s.SpanDetails>
                  <s.ButtonsContainer>
                    <JiraButton
                      onTicketInfoButtonClick={handleTicketInfoButtonClick}
                      spanCodeObjectId={spanInfo.spanCodeObjectId}
                      ticketLink={span.ticketLink}
                      buttonType={"small"}
                      isHintEnabled={props.isJiraHintEnabled}
                    />
                    {config.isJaegerEnabled && (
                      <Tooltip title={"Trace"}>
                        <Button
                          icon={{ component: CrosshairIcon }}
                          onClick={() =>
                            handleTraceButtonClick(
                              {
                                name: spanName,
                                id: span.traceId
                              },
                              props.insight.type,
                              spanInfo.spanCodeObjectId
                            )
                          }
                        />
                      </Tooltip>
                    )}
                  </s.ButtonsContainer>
                </s.Span>
              );
            })}
            <Pagination
              itemsCount={props.insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </s.SpanList>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
