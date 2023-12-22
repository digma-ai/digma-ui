import { useContext } from "react";
import { InsightType } from "../../../types";
import { getCriticalityLabel } from "../../../utils/getCriticalityLabel";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Button } from "../../common/Button";
import { ScoreIndicator } from "../../common/ScoreIndicator";
import { Tooltip } from "../../common/Tooltip";
import { JiraLogoIcon } from "../../common/icons/12px/JiraLogoIcon";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import { trackingEvents } from "../tracking";
import { Trace } from "../types";
import * as s from "./styles";
import { NPlusOneInsightProps } from "./types";

export const NPlusOneInsight = (props: NPlusOneInsightProps) => {
  const config = useContext(ConfigContext);

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

  const handleCreateJiraTicketButtonClick = () => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate && props.onJiraTicketCreate(props.insight);
  };

  const spanName = props.insight.clientSpanName || undefined;
  const spanCodeObjectId = props.insight.clientSpanCodeObjectId || undefined;
  const traceId = props.insight.traceId;

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>Check the following SELECT statement:</Description>
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
                    props.insight.type,
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
              <Description>Repeats</Description>
              <span>{props.insight.occurrences} (median)</span>
            </s.Stat>
            <s.Stat>
              <Description>Duration</Description>
              <span>
                {props.insight.duration.value} {props.insight.duration.unit}
              </span>
            </s.Stat>
          </s.Stats>
          <Description>Affected endpoints:</Description>
          <s.EndpointList>
            {props.insight.endpoints.map((x) => {
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      buttons={[
        <Button
          key={"view-ticket-info"}
          onClick={handleCreateJiraTicketButtonClick}
          icon={{ component: JiraLogoIcon }}
        >
          Ticket Info
        </Button>
      ]}
    />
  );
};
