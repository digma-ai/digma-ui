import { ReactNode, useContext, useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { sendTrackingEvent } from "../../../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { trackingEvents } from "../../../tracking";
import {
  EndpointQueryOptimizationSpan,
  InsightType,
  Trace
} from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { ListItem } from "../../InsightCard/ListItem";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { EndpointQueryOptimizationInsightProps } from "./types";

const renderOptions = (
  spans: EndpointQueryOptimizationSpan[],
  handleLinkClick: (spanCodeObjectId: string) => void
): { label: string; customContent: ReactNode; value: string }[] => {
  return spans.map((x) => {
    const spanCodeObjectId = x.spanInfo.spanCodeObjectId;
    return {
      label: x.spanInfo.displayName,
      customContent: (
        <s.SelectedItem>
          <ListItem
            name={x.spanInfo.displayName}
            onClick={() => handleLinkClick(spanCodeObjectId)}
          />
        </s.SelectedItem>
      ),
      value: spanCodeObjectId
    };
  });
};

export const EndpointQueryOptimizationInsight = (
  props: EndpointQueryOptimizationInsightProps
) => {
  const config = useContext(ConfigContext);

  const [selectedSpan, setSelectedSpan] = useState(
    props.insight.spans ? props.insight.spans[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED, {
      insightType: props.insight.type
    });
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Check the following locations:</Description>
            <Select
              value={selectedSpan?.spanInfo.spanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  props.insight.spans.find(
                    (x) => x.spanInfo.spanCodeObjectId === selectedOption
                  ) || null;

                setSelectedSpan(selected);
              }}
              options={renderOptions(props.insight.spans, handleSpanLinkClick)}
            />
          </Details>
          {selectedSpan && (
            <ColumnsContainer>
              <KeyValue label={"Duration"}>
                {getDurationString(selectedSpan.duration)}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToTrace={
        config.isJaegerEnabled && selectedSpan?.traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: selectedSpan?.spanInfo.displayName,
                  id: selectedSpan?.traceId
                },
                props.insight.type,
                selectedSpan?.spanInfo.spanCodeObjectId
              )
          : undefined
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: selectedSpan?.ticketLink,
        spanCodeObjectId: selectedSpan?.spanInfo.spanCodeObjectId,
        isHintEnabled: props.isJiraHintEnabled
      }}
    />
  );
};