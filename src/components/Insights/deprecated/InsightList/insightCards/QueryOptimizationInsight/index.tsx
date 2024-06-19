import { useContext } from "react";
import { InsightType } from "../../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { Tooltip } from "../../../../../common/Tooltip";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { QueryOptimizationInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const QueryOptimizationInsight = ({
  onAssetLinkClick,
  insight,
  onTraceButtonClick,
  onJiraTicketCreate,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled
}: QueryOptimizationInsightProps) => {
  const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, insight.spanInfo?.spanCodeObjectId, event);
    }
  };

  const spanName = insight.spanInfo?.displayName ?? undefined;
  const spanCodeObjectId = insight.spanInfo?.spanCodeObjectId ?? undefined;
  const traceId = insight.traceId;
  const endpoints = insight.endpoints ?? [];

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>
            Query is slow compared to other {insight.dbStatement.toUpperCase()}{" "}
            requests.
          </Description>
          <s.SpanContainer>
            <Tooltip title={spanName}>
              <s.Name>
                {spanCodeObjectId ? (
                  <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                    {spanName}
                  </Link>
                ) : (
                  spanName
                )}
              </s.Name>
            </Tooltip>
            {config.isJaegerEnabled && traceId && (
              <s.Button
                onClick={() =>
                  handleTraceButtonClick(
                    {
                      name: spanName,
                      id: traceId
                    },
                    insight.type,
                    spanCodeObjectId
                  )
                }
                icon={{ component: CrosshairIcon }}
              >
                Trace
              </s.Button>
            )}
          </s.SpanContainer>
          <s.Stats>
            <s.Stat>
              <Description>Duration</Description>
              <span>{getDurationString(insight.duration)}</span>
            </s.Stat>
            <s.Stat>
              <Description>Typical Duration</Description>
              <span>{getDurationString(insight.typicalDuration)}</span>
            </s.Stat>
          </s.Stats>
          <Description>Affected endpoints:</Description>
          <s.EndpointList>
            {endpoints.map((x) => {
              const spanCodeObjectId = x.endpointInfo.spanCodeObjectId;
              const route = trimEndpointScheme(x.endpointInfo.route);

              return (
                <s.Endpoint key={spanCodeObjectId}>
                  <Tooltip title={route}>
                    <s.Name>
                      <Link
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      >
                        {route}
                      </Link>
                    </s.Name>
                  </Tooltip>
                </s.Endpoint>
              );
            })}
          </s.EndpointList>
        </s.ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      buttons={[
        <JiraButton
          key={"view-ticket-info"}
          onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
          spanCodeObjectId={insight.spanInfo?.spanCodeObjectId}
          ticketLink={insight.ticketLink}
          buttonType={"large"}
          isHintEnabled={isJiraHintEnabled}
        />
      ]}
    />
  );
};
