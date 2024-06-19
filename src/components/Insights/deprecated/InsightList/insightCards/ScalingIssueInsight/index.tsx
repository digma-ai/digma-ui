import { useContext } from "react";
import { InsightType } from "../../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { Button } from "../../../../../common/Button";
import { Tooltip } from "../../../../../common/Tooltip";
import { ChartIcon } from "../../../../../common/icons/ChartIcon";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { ScalingIssueInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const ScalingIssueInsight = ({
  onAssetLinkClick,
  insight,
  onTraceButtonClick,
  onHistogramButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh
}: ScalingIssueInsightProps) => {
  const config = useContext(ConfigContext);

  const handleLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleHistogramButtonClick = () => {
    insight.spanInfo &&
      onHistogramButtonClick(
        insight.spanInfo.spanCodeObjectId,
        insight.type,
        insight.spanInfo.displayName
      );
  };

  const handleCreateJiraTicketButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  const affectedEndpoints = insight.affectedEndpoints ?? [];

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>{insight.shortDisplayInfo.description}</Description>
          <s.Stats>
            <s.Stat>
              <Criticality value={insight.criticality} />
            </s.Stat>
            <s.Stat>
              <Description>Tested concurrency</Description>
              <span>{insight.maxConcurrency}</span>
            </s.Stat>
            <s.Stat>
              <Description>Duration</Description>
              <span>
                {getDurationString(insight.minDuration)} -{" "}
                {getDurationString(insight.maxDuration)}
              </span>
            </s.Stat>
          </s.Stats>
          {insight.rootCauseSpans.length > 0 && (
            <s.List>
              <Description>Caused by:</Description>
              {insight.rootCauseSpans.map((span, i) => {
                const spanName = span.displayName;
                const traceId = span.sampleTraceId;
                const spanCodeObjectId = span.spanCodeObjectId;

                return (
                  <s.RootCause key={spanCodeObjectId}>
                    <Tooltip title={spanName}>
                      <s.SpanName>
                        <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
                          {spanName}
                        </Link>
                      </s.SpanName>
                    </Tooltip>
                    <s.ButtonsContainer>
                      <JiraButton
                        key={"view-ticket-info"}
                        onTicketInfoButtonClick={
                          handleCreateJiraTicketButtonClick
                        }
                        spanCodeObjectId={spanCodeObjectId}
                        ticketLink={insight.ticketLink}
                        buttonType={"small"}
                        isHintEnabled={isJiraHintEnabled && i === 0}
                      />
                      {config.isJaegerEnabled && traceId && (
                        <s.Button
                          icon={{ component: CrosshairIcon }}
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
                        >
                          Trace
                        </s.Button>
                      )}
                    </s.ButtonsContainer>
                  </s.RootCause>
                );
              })}
            </s.List>
          )}
          {affectedEndpoints.length > 0 && (
            <s.List>
              <Description>Affected endpoints:</Description>
              {affectedEndpoints.map((endpoint) => {
                const endpointRoute = trimEndpointScheme(endpoint.route);

                return (
                  <Tooltip title={endpointRoute} key={endpoint.route}>
                    <s.Endpoint>
                      <Link
                        onClick={() =>
                          handleLinkClick(endpoint.spanCodeObjectId)
                        }
                      >
                        {endpointRoute}
                      </Link>
                    </s.Endpoint>
                  </Tooltip>
                );
              })}
            </s.List>
          )}
        </s.ContentContainer>
      }
      buttons={[
        ...(insight.rootCauseSpans.length == 0
          ? [
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={insight.spanInfo?.spanCodeObjectId}
                ticketLink={insight.ticketLink}
                buttonType={"large"}
                isHintEnabled={isJiraHintEnabled}
              />
            ]
          : []),
        ...(insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : [])
      ]}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
