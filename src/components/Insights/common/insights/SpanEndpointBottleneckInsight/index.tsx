import { ReactNode, useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { Link } from "../../../../common/v3/Link";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { BottleneckEndpointInfo } from "../../../types";
import { Info } from "../../Info";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanEndpointBottleneckInsightProps } from "./types";

const renderOptions = (
  endpoints: BottleneckEndpointInfo[],
  handleLinkClick: (spanCodeObjectId?: string) => void
): { label: string; customContent: ReactNode; value: string }[] =>
  endpoints.map((x) => {
    const spanCodeObjectId = x.endpointInfo.spanCodeObjectId;
    const route = trimEndpointScheme(x.endpointInfo.route);
    return {
      label: route,
      customContent: (
        <s.SelectedItem>
          {x.endpointInfo.serviceName}
          <Tooltip title={route}>
            <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
              {route}
            </Link>
          </Tooltip>
        </s.SelectedItem>
      ),
      value: spanCodeObjectId
    };
  });
export const SpanEndpointBottleneckInsight = (
  props: SpanEndpointBottleneckInsightProps
) => {
  const slowEndpoints = props.insight.slowEndpoints || [];
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    slowEndpoints.length > 0 ? slowEndpoints[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId &&
      props.onAssetLinkClick(spanCodeObjectId, props?.insight.type);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, undefined, event);
  };

  if (slowEndpoints.length === 0) {
    return null;
  }

  return (
    <InsightCard
      insight={props.insight}
      onJiraButtonClick={handleCreateJiraTicketButtonClick}
      jiraTicketInfo={{
        spanCodeObjectId: selectedEndpoint?.endpointInfo.spanCodeObjectId,
        ticketLink: props.insight.ticketLink,
        isHintEnabled: props.isJiraHintEnabled
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>
              Affected Endpoints ({slowEndpoints.length})
            </Description>
            <Select
              value={selectedEndpoint?.endpointInfo.spanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  slowEndpoints.find(
                    (x) => x.endpointInfo.spanCodeObjectId === selectedOption
                  ) || null;

                setSelectedEndpoint(selected);
              }}
              options={renderOptions(slowEndpoints, handleSpanLinkClick)}
            />
          </Details>
          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue label={"% of Duration"}>
                {selectedEndpoint.avgFractionWhenBeingBottleneck}%
              </KeyValue>
              <KeyValue
                label={
                  <Info
                    text={
                      "Percentage of request consumed by the bottleneck span"
                    }
                    name={"% of Request"}
                  />
                }
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue label={"Duration"}>
                {getDurationString(
                  selectedEndpoint.avgDurationWhenBeingBottleneck
                )}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
    />
  );
};
