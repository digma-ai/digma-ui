import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../utils/roundTo";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { Tooltip } from "../../../../../common/Tooltip";
import { Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { InsightCard } from "../../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { BottleneckInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const BottleneckInsight = ({
  onAssetLinkClick,
  insight,
  onJiraTicketCreate,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled
}: BottleneckInsightProps) => {
  const handleEndpointLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

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

  const slowEndpoints = insight.slowEndpoints ?? [];

  return (
    <InsightCard
      spanInfo={insight.spanInfo}
      data={insight}
      content={
        <>
          <s.EndpointList>
            {slowEndpoints.map((endpoint, i) => {
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
            <Criticality value={insight.criticality} />
            <s.Box>
              <JiraButton
                onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
                spanCodeObjectId={insight.spanInfo?.spanCodeObjectId}
                ticketLink={insight.ticketLink}
                buttonType={"large"}
                isHintEnabled={isJiraHintEnabled}
              />
            </s.Box>
          </s.Container>
        </>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
