import { useEffect, useMemo, useState } from "react";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { isNull } from "../../../../../../../typeGuards/isNull";
import type { InsightType } from "../../../../../../../types";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../../utils/trimEndpointScheme";
import {
  AffectedEndpointsSelector,
  getEndpointKey
} from "../../../../../../common/AffectedEndpointsSelector";
import type { Option } from "../../../../../../common/AffectedEndpointsSelector/types";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../../common/v3/Button";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type { BottleneckEndpointInfo } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import type { SpanEndpointBottleneckInsightCardProps } from "./types";

const getSelectorOption = (
  endpoint: BottleneckEndpointInfo
): Option<string> => ({
  route: trimEndpointScheme(endpoint.endpointInfo.route),
  serviceName: endpoint.endpointInfo.serviceName,
  spanCodeObjectId: endpoint.endpointInfo.spanCodeObjectId,
  metric: {
    value: getDurationString(endpoint.avgDurationWhenBeingBottleneck),
    label: "Duration"
  }
});

export const SpanEndpointBottleneckInsightCard = ({
  insight,
  onJiraTicketCreate,
  onAssetLinkClick,
  onTraceButtonClick,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: SpanEndpointBottleneckInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();
  const slowEndpoints = useMemo(
    () =>
      [...(insight.slowEndpoints ?? [])].sort(
        (a, b) =>
          b.avgDurationWhenBeingBottleneck.raw -
          a.avgDurationWhenBeingBottleneck.raw
      ),
    [insight.slowEndpoints]
  );
  const selectorOptions: Option<string>[] = useMemo(
    () => slowEndpoints.map(getSelectorOption),
    [slowEndpoints]
  );

  const endpointWithMaxDuration =
    slowEndpoints.length > 0 ? slowEndpoints[0] : undefined;
  const maxDurationString = endpointWithMaxDuration
    ? getDurationString(endpointWithMaxDuration.avgDurationWhenBeingBottleneck)
    : undefined;

  const [selectedEndpointKey, setSelectedEndpointKey] = useState<
    string | undefined
  >(selectorOptions[0] ? getEndpointKey(selectorOptions[0]) : undefined);

  useEffect(() => {
    const newOption = selectedEndpointKey
      ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
      : selectorOptions[0];

    setSelectedEndpointKey(newOption ? getEndpointKey(newOption) : undefined);
  }, [selectorOptions, selectedEndpointKey]);

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    if (spanCodeObjectId) {
      onAssetLinkClick(spanCodeObjectId, insight.type);
    }
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  const handleTraceButtonClick =
    (
      endpoint: BottleneckEndpointInfo,
      insightType: InsightType,
      spanCodeObjectId?: string
    ) =>
    () => {
      if (isNull(endpoint.traceId)) {
        return;
      }

      onTraceButtonClick(
        {
          name: endpoint.endpointInfo.route,
          id: endpoint.traceId
        },
        insightType,
        spanCodeObjectId
      );
    };

  const handleAffectedEndpointsSelectorChange = (endpointKey: string) => {
    setSelectedEndpointKey(endpointKey);
  };

  const selectedEndpoint = useMemo(
    () =>
      selectedEndpointKey
        ? slowEndpoints.find(
            (x) => getEndpointKey(x.endpointInfo) === selectedEndpointKey
          )
        : undefined,
    [selectedEndpointKey, slowEndpoints]
  );

  return (
    <InsightCard
      insight={insight}
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      content={
        <ContentContainer>
          <Details>
            <Description>
              Affected Endpoints ({selectorOptions.length})
            </Description>
            <s.SelectContainer>
              <AffectedEndpointsSelector
                onChange={handleAffectedEndpointsSelectorChange}
                onAssetLinkClick={handleSpanLinkClick}
                value={selectedEndpointKey}
                options={selectorOptions}
                isDisabled={selectorOptions.length === 0}
              />
              {isJaegerEnabled && selectedEndpoint?.traceId && (
                <Tooltip title={"Open Trace"}>
                  <Button
                    icon={TraceIcon}
                    onClick={handleTraceButtonClick(
                      selectedEndpoint,
                      insight.type,
                      insight.spanInfo?.spanCodeObjectId
                    )}
                  />
                </Tooltip>
              )}
            </s.SelectContainer>
          </Details>
          {selectedEndpoint && (
            <ColumnsContainer>
              <KeyValue
                label={"% of Duration"}
                info={
                  "The percentage of the overall request time taken up by this bottleneck asset"
                }
              >
                {selectedEndpoint.avgFractionWhenBeingBottleneck}%
              </KeyValue>
              <KeyValue
                label={"% of Requests"}
                info={
                  "The percentage of requests for the selected endpoint experiencing this bottleneck"
                }
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue
                label={"Duration"}
                info={
                  "The average duration when being detected as a bottleneck for selected endpoint"
                }
              >
                {getDurationString(
                  selectedEndpoint.avgDurationWhenBeingBottleneck
                )}
              </KeyValue>
            </ColumnsContainer>
          )}
        </ContentContainer>
      }
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
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
