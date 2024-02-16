import { getDurationString } from "../../../utils/getDurationString";
import { roundTo } from "../../../utils/roundTo";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { Tooltip } from "../../common/Tooltip";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import { Link } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { BottleneckInsightProps } from "./types";

export const BottleneckInsight = (props: BottleneckInsightProps) => {
  const handleEndpointLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, undefined, event);
  };

  return (
    <InsightCard
      spanInfo={props.insight.spanInfo}
      data={props.insight}
      content={
        <>
          <s.EndpointList>
            {props.insight.slowEndpoints.map((endpoint, i) => {
              const endpointName = `${
                endpoint.endpointInfo.serviceName
              }:${trimEndpointScheme(endpoint.endpointInfo.route)}`;

              return (
                <s.Endpoint key={i}>
                  <s.EndpointData>
                    <Tooltip title={endpointName}>
                      <s.EndpointName>
                        <Link
                          onClick={() =>
                            handleEndpointLinkClick(
                              endpoint.endpointInfo.spanCodeObjectId
                            )
                          }
                        >
                          {endpointName}
                        </Link>
                      </s.EndpointName>
                    </Tooltip>
                    <s.Duration>
                      {getDurationString(
                        endpoint.avgDurationWhenBeingBottleneck
                      )}
                    </s.Duration>
                  </s.EndpointData>
                  <s.Description>
                    Slowing{" "}
                    {roundTo(endpoint.probabilityOfBeingBottleneck * 100, 2)}%
                    of the requests
                  </s.Description>
                </s.Endpoint>
              );
            })}
          </s.EndpointList>
          <s.Container>
            <Criticality value={props.insight.criticality} />
            <s.Box>
              <JiraButton
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={props.insight.spanInfo?.spanCodeObjectId}
                ticketLink={props.insight.ticketLink}
                buttonType={"large"}
                isHintEnabled={props.isJiraHintEnabled}
              />
            </s.Box>
          </s.Container>
        </>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
