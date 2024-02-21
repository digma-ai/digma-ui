import { useContext } from "react";
import { InsightType } from "../../../types";
import { getDurationString } from "../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Button } from "../../common/Button";
import { Tooltip } from "../../common/Tooltip";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { ScalingIssueInsightProps } from "./types";
import { JiraButton } from "../common/JiraButton";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { trackingEvents } from "../tracking";

export const ScalingIssueInsight = (props: ScalingIssueInsightProps) => {
  const config = useContext(ConfigContext);

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

  const handleHistogramButtonClick = () => {
    props.insight.spanInfo &&
      props.onHistogramButtonClick(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type,
        props.insight.spanInfo.displayName
      );
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });

    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(
        props.insight,
        props.insight.spanInfo?.spanCodeObjectId,
        event
      );
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>
            {props.insight.shortDisplayInfo.description}
          </Description>
          <s.Stats>
            <s.Stat>
              <Criticality value={props.insight.criticality} />
            </s.Stat>
            <s.Stat>
              <Description>Tested concurrency</Description>
              <span>{props.insight.maxConcurrency}</span>
            </s.Stat>
            <s.Stat>
              <Description>Duration</Description>
              <span>
                {getDurationString(props.insight.minDuration)} -{" "}
                {getDurationString(props.insight.maxDuration)}
              </span>
            </s.Stat>
          </s.Stats>
          {props.insight.rootCauseSpans.length > 0 && (
            <s.List>
              <Description>Caused by:</Description>
              {props.insight.rootCauseSpans.map((span) => {
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
                    {config.isJaegerEnabled && traceId && (
                      <s.Button
                        icon={{ component: CrosshairIcon }}
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
                      >
                        Trace
                      </s.Button>
                    )}
                  </s.RootCause>
                );
              })}
            </s.List>
          )}
          {props.insight.affectedEndpoints.length > 0 && (
            <s.List>
              <Description>Affected endpoints:</Description>
              {props.insight.affectedEndpoints.map((endpoint) => {
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
        ...(props.insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>,
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={props.insight.spanInfo?.spanCodeObjectId}
                ticketLink={props.insight.ticketLink}
                buttonType={"large"}
                isHintEnabled={props.isJiraHintEnabled}
              />
            ]
          : [])
      ]}
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
