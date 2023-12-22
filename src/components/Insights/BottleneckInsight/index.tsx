import { roundTo } from "../../../utils/roundTo";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../utils/trimEndpointScheme";
import { Button } from "../../common/Button";
import { Tooltip } from "../../common/Tooltip";
import { JiraLogoIcon } from "../../common/icons/12px/JiraLogoIcon";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { BottleneckInsightProps } from "./types";

export const BottleneckInsight = (props: BottleneckInsightProps) => {
  const handleEndpointLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleCreateJiraTicketButtonClick = () => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate && props.onJiraTicketCreate(props.insight);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
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
                    {endpoint.avgDurationWhenBeingBottleneck.value}{" "}
                    {endpoint.avgDurationWhenBeingBottleneck.unit}
                  </s.Duration>
                </s.EndpointData>
                <s.Description>
                  Slowing{" "}
                  {roundTo(endpoint.probabilityOfBeingBottleneck * 100, 2)}% of
                  the requests
                </s.Description>
              </s.Endpoint>
            );
          })}
        </s.EndpointList>
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
