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
 */
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

  const handleCreateJiraTicketButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );

    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  const affectedEndpoints = props.insight.affectedEndpoints || [];

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
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
              {props.insight.rootCauseSpans.map((span, i) => {
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
                        ticketLink={props.insight.ticketLink}
                        buttonType={"small"}
                        isHintEnabled={props.isJiraHintEnabled && i === 0}
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
                              props.insight.type,
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
        ...(props.insight.rootCauseSpans.length == 0
          ? [
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={props.insight.spanInfo?.spanCodeObjectId}
                ticketLink={props.insight.ticketLink}
                buttonType={"large"}
                isHintEnabled={props.isJiraHintEnabled}
              />
            ]
          : []),
        ...(props.insight.spanInfo
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
