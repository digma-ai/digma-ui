import { useContext, useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanNPlusOneInsightProps } from "./types";

export const SpanNPlusOneInsight = (props: SpanNPlusOneInsightProps) => {
  const {
    insight: { type, endpoints, ticketLink }
  } = props;

  const config = useContext(ConfigContext);
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    props.insight.endpoints.length ? props.insight.endpoints[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && props.onAssetLinkClick(spanCodeObjectId, type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, undefined, event);
  };

  const spanName = props.insight.clientSpanName || undefined;
  const spanCodeObjectId = props.insight.clientSpanCodeObjectId || undefined;
  const traceId = props.insight.traceId;

  return (
    <InsightCard
      insight={props.insight}
      onGoToTrace={
        config.isJaegerEnabled && traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: spanName,
                  id: traceId
                },
                props.insight.type,
                spanCodeObjectId
              )
          : undefined
      }
      content={
        <ContentContainer>
          <Details>
            <Description>Effected Endpoints ({endpoints.length})</Description>
            <Select
              value={selectedEndpoint?.endpointInfo.entrySpanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  endpoints.find(
                    (x) =>
                      x.endpointInfo.entrySpanCodeObjectId === selectedOption
                  ) || null;

                setSelectedEndpoint(selected);
              }}
              options={props.insight.endpoints.map((x) => {
                const spanCodeObjectId = x.endpointInfo.entrySpanCodeObjectId;
                const route = trimEndpointScheme(x.endpointInfo.route);
                return {
                  label: route,
                  customContent: (
                    <s.SelectedItem>
                      {x.endpointInfo.serviceName}
                      <ListItem
                        name={route}
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      />
                    </s.SelectedItem>
                  ),
                  value: spanCodeObjectId
                };
              })}
            />
          </Details>

          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue label={"Repeats"}>
                {selectedEndpoint.occurrences}
              </KeyValue>
              <KeyValue
                label={
                  <Tooltip
                    title={"The amount of requests affected by this issue."}
                  >
                    <s.InfoContainer>
                      <div>Requests</div>
                      <InfoCircleIcon color={"currentColor"} size={12} />
                    </s.InfoContainer>
                  </Tooltip>
                }
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue label={"Duration"}>
                {getDurationString(selectedEndpoint.duration)}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onJiraButtonClick={handleCreateJiraTicketButtonClick}
      jiraTicketInfo={{
        ticketLink,
        isHintEnabled: props.isJiraHintEnabled,
        spanCodeObjectId: props.insight.spanInfo?.spanCodeObjectId
      }}
    />
  );
};
