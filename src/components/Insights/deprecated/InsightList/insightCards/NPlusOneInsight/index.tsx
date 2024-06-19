import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getCriticalityLabel } from "../../../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { ScoreIndicator } from "../../../../../common/ScoreIndicator";
import { Tooltip } from "../../../../../common/Tooltip";
import { Description, Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { InsightCard } from "../../InsightCard";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { NPlusOneInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const NPlusOneInsight = ({
  onAssetLinkClick,
  insight,
  onJiraTicketCreate,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled
}: NPlusOneInsightProps) => {
  // const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId, insight.type);
    }
  };

  // const handleTraceButtonClick = (
  //   trace: Trace,
  //   insightType: InsightType,
  //   spanCodeObjectId?: string
  // ) => {
  //   onTraceButtonClick(trace, insightType, spanCodeObjectId);
  // };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, undefined, event);
    }
  };

  // const spanName = insight.clientSpanName || undefined;
  // const spanCodeObjectId = insight.clientSpanCodeObjectId || undefined;
  // const traceId = insight.traceId;

  const endpoints = insight.endpoints ?? [];

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>Check the following SELECT statement:</Description>
          <s.SpanContainer>
            {/* <Tooltip title={spanName}>
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
            )} */}
          </s.SpanContainer>
          <s.Stats>
            {/* <s.Stat>
              <Description>Repeats</Description>
              <span>{insight.occurrences} (median)</span>
            </s.Stat> */}
            <s.Stat>
              <Description>Duration</Description>
              <span>{getDurationString(insight.duration)}</span>
            </s.Stat>
          </s.Stats>
          <Description>Affected endpoints:</Description>
          <s.EndpointList>
            {endpoints.map((x) => {
              const spanCodeObjectId = x.endpointInfo.entrySpanCodeObjectId;
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
                  <s.Stats>
                    <s.Stat>
                      <Description>Criticality</Description>
                      <Tooltip title={x.criticality}>
                        <s.CriticalityValue>
                          {x.criticality > 0 && (
                            <ScoreIndicator score={x.criticality} />
                          )}
                          {getCriticalityLabel(x.criticality)}
                        </s.CriticalityValue>
                      </Tooltip>
                    </s.Stat>
                    <s.Stat>
                      <Description>Repeats</Description>
                      <span>{x.occurrences} (median)</span>
                    </s.Stat>
                  </s.Stats>
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
