import { useMemo, useState } from "react";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import { getDurationString } from "../../../../../../utils/getDurationString";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../../../../common/AffectedEndpointsSelector";
import { Option } from "../../../../../common/AffectedEndpointsSelector/types";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../common/v3/Button";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpaNPlusOneInsightCardProps } from "./types";

export const SpaNPlusOneInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode
}: SpaNPlusOneInsightCardProps) => {
  const endpoints = useMemo(() => insight.endpoints ?? [], [insight.endpoints]);
  const endpointWithMaxDuration = endpoints.reduce(
    (acc, cur) => (acc.duration.raw >= cur.duration.raw ? acc : cur),
    endpoints[0]
  );
  const maxDurationString = getDurationString(endpointWithMaxDuration.duration);
  const { isJaegerEnabled } = useConfigSelector();
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    endpoints.length ? endpoints[0] : undefined
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId, insight.type);
    }
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  const handleAffectedEndpointsSelectorChange = (option: Option | null) => {
    const newValue = option
      ? endpoints.find(
          (x) =>
            x.endpointInfo.serviceName === option.serviceName &&
            x.endpointInfo.entrySpanCodeObjectId === option.spanCodeObjectId
        )
      : undefined;

    setSelectedEndpoint(newValue);
  };

  const selectorOptions = useMemo(
    () =>
      endpoints.map((x) => ({
        route: x.endpointInfo.route,
        serviceName: x.endpointInfo.serviceName,
        spanCodeObjectId: x.endpointInfo.entrySpanCodeObjectId
      })),
    [endpoints]
  );
  const selectorValue = selectedEndpoint
    ? getEndpointKey(selectedEndpoint.endpointInfo)
    : undefined;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Details>
            <Description>
              Affected Endpoints ({selectorOptions.length})
            </Description>
            <s.SelectContainer>
              <AffectedEndpointsSelector
                value={selectorValue}
                onChange={handleAffectedEndpointsSelectorChange}
                options={selectorOptions}
                onAssetLinkClick={handleSpanLinkClick}
              />
              {isJaegerEnabled && selectedEndpoint && (
                <Tooltip title={"Open Trace"}>
                  <Button
                    icon={TraceIcon}
                    onClick={() =>
                      handleTraceButtonClick(
                        {
                          name: selectedEndpoint.endpointInfo.route,
                          id: selectedEndpoint.traceId
                        },
                        insight.type,
                        insight.spanInfo?.spanCodeObjectId
                      )
                    }
                  />
                </Tooltip>
              )}
            </s.SelectContainer>
          </Details>

          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue
                label={"Repeats"}
                info={
                  "The median number of times this query repeats in each request"
                }
              >
                {selectedEndpoint.occurrences}
              </KeyValue>
              <KeyValue
                label={"Requests"}
                info={"The amount of requests affected by this issue"}
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue
                label={"Duration"}
                info={
                  "The execution time of the last group of queries for selected endpoint"
                }
              >
                {getDurationString(selectedEndpoint.duration)}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={maxDurationString}>
          <span>{maxDurationString}</span>
        </Tooltip>
      }
    />
  );
};
