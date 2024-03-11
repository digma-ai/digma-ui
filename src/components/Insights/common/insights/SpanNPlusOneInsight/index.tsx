import { ReactNode, useContext, useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { TraceIcon } from "../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../common/v3/Button";
import { Link } from "../../../../common/v3/Link";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { InsightType, NPlusOneEndpointInfo, Trace } from "../../../types";
import { Info } from "../../Info";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanNPlusOneInsightProps } from "./types";

const renderOptions = (
  endpoints: NPlusOneEndpointInfo[],
  handleLinkClick: (spanCodeObjectId?: string) => void
): { label: string; customContent: ReactNode; value: string }[] =>
  endpoints.map((x) => {
    const spanCodeObjectId = x.endpointInfo.entrySpanCodeObjectId;
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

export const SpanNPlusOneInsight = (props: SpanNPlusOneInsightProps) => {
  const endpoints = props.insight.endpoints || [];
  const config = useContext(ConfigContext);
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    endpoints.length ? endpoints[0] : null
  );

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

  const handleCreateJiraTicketButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Affected Endpoints ({endpoints.length})</Description>
            <s.SelectContainer>
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
                options={renderOptions(endpoints, handleSpanLinkClick)}
              />
              {config.isJaegerEnabled && selectedEndpoint && (
                <Tooltip title={"Open Trace"}>
                  <Button
                    icon={TraceIcon}
                    onClick={() =>
                      handleTraceButtonClick(
                        {
                          name: selectedEndpoint.endpointInfo.route,
                          id: selectedEndpoint.traceId
                        },
                        props.insight.type,
                        selectedEndpoint.endpointInfo.spanCodeObjectId
                      )
                    }
                  />
                </Tooltip>
              )}
            </s.SelectContainer>
          </Details>

          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue label={"Repeats"}>
                {selectedEndpoint.occurrences}
              </KeyValue>
              <KeyValue
                label={
                  <Info
                    text={"The amount of requests affected by this issue."}
                    name={"Requests"}
                  />
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
        ticketLink: props.insight.ticketLink,
        isHintEnabled: props.isJiraHintEnabled
      }}
      onGoToSpan={props.onGoToSpan}
    />
  );
};
