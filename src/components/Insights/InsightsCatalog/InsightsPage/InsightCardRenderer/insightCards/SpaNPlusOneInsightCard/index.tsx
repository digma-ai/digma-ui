import { useEffect, useMemo, useState } from "react";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../../../../../common/AffectedEndpointsSelector";
import type { Option } from "../../../../../../common/AffectedEndpointsSelector/types";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../../common/v3/Button";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type {
  InsightType,
  NPlusOneEndpointInfo,
  Trace
} from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import type { SpaNPlusOneInsightCardProps } from "./types";

const getSelectorOption = (endpoint: NPlusOneEndpointInfo): Option<number> => ({
  route: endpoint.endpointInfo.route,
  serviceName: endpoint.endpointInfo.serviceName,
  spanCodeObjectId: endpoint.endpointInfo.entrySpanCodeObjectId,
  metric: {
    value: endpoint.occurrences,
    label: "Repeats"
  }
});

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
  viewMode,
  onDismissalChange
}: SpaNPlusOneInsightCardProps) => {
  const endpoints = useMemo(
    () =>
      [...(insight.endpoints ?? [])].sort(
        (a, b) => b.occurrences - a.occurrences
      ),
    [insight.endpoints]
  );

  const selectorOptions = useMemo(
    () => endpoints.map(getSelectorOption),
    [endpoints]
  );
  const endpointWithMaxDuration =
    endpoints.length > 0 ? endpoints[0] : undefined;
  const maxDurationString = endpointWithMaxDuration
    ? getDurationString(endpointWithMaxDuration.duration)
    : undefined;
  const { isJaegerEnabled } = useConfigSelector();
  const [selectedEndpointKey, setSelectedEndpointKey] = useState<
    string | undefined
  >(selectorOptions[0] ? getEndpointKey(selectorOptions[0]) : undefined);

  useEffect(() => {
    const option = selectedEndpointKey
      ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
      : undefined;

    setSelectedEndpointKey(option ? getEndpointKey(option) : undefined);
  }, [selectorOptions, selectedEndpointKey]);

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

  const handleAffectedEndpointsSelectorChange = (endpointKey: string) => {
    setSelectedEndpointKey(endpointKey);
  };

  const selectedOption = useMemo(
    () =>
      selectedEndpointKey
        ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
        : undefined,
    [selectedEndpointKey, selectorOptions]
  );

  const selectedEndpoint = useMemo(
    () =>
      selectedOption
        ? endpoints.find(
            (x) =>
              x.endpointInfo.route === selectedOption.route &&
              x.endpointInfo.serviceName === selectedOption.serviceName &&
              x.endpointInfo.entrySpanCodeObjectId ===
                selectedOption.spanCodeObjectId
          )
        : undefined,
    [selectedOption, endpoints]
  );

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
                value={selectedEndpointKey}
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
        maxDurationString ? (
          <Tooltip title={maxDurationString}>
            <span>{maxDurationString}</span>
          </Tooltip>
        ) : undefined
      }
      onDismissalChange={onDismissalChange}
    />
  );
};
