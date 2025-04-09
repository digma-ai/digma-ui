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
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type {
  AffectedEndpoint,
  RootCauseSpanInfo,
  Trace
} from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ListItem } from "../common/InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import type { SpanScalingInsightCardProps } from "./types";

const getSelectorOption = (endpoint: AffectedEndpoint): Option => ({
  route: trimEndpointScheme(endpoint.route),
  serviceName: endpoint.serviceName,
  spanCodeObjectId: endpoint.spanCodeObjectId
});

export const SpanScalingInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onHistogramButtonClick,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: SpanScalingInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();

  const affectedEndpoints = useMemo(
    () => insight.affectedEndpoints ?? [],
    [insight.affectedEndpoints]
  );

  const selectorOptions: Option[] = useMemo(
    () => affectedEndpoints.map(getSelectorOption),
    [affectedEndpoints]
  );

  const [selectedEndpointKey, setSelectedEndpointKey] = useState<
    string | undefined
  >(selectorOptions[0] ? getEndpointKey(selectorOptions[0]) : undefined);

  useEffect(() => {
    const newOption = selectedEndpointKey
      ? selectorOptions.find((x) => getEndpointKey(x) === selectedEndpointKey)
      : undefined;

    setSelectedEndpointKey(newOption ? getEndpointKey(newOption) : undefined);
  }, [selectorOptions, selectedEndpointKey]);

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  const renderRootCause = (rootCauseSpans: RootCauseSpanInfo[]) => {
    if (rootCauseSpans.length > 0) {
      const handleLinkClick = (spanCodeObjectId: string) => () => {
        onAssetLinkClick(spanCodeObjectId, insight.type);
      };

      const handleTraceButtonClick =
        (trace: Trace, insightType: InsightType, spanCodeObjectId: string) =>
        () => {
          onTraceButtonClick(trace, insightType, spanCodeObjectId);
        };

      return (
        <s.Details>
          <Description>Caused by</Description>
          {rootCauseSpans.map((span, i) => {
            const spanName = span.displayName;
            const traceId = span.sampleTraceId;
            const spanCodeObjectId = span.spanCodeObjectId;

            const buttons = [
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoOpen={handleTicketInfoButtonClick}
                spanCodeObjectId={spanCodeObjectId}
                ticketLink={insight.ticketLink}
                isHintEnabled={isJiraHintEnabled && i === 0}
                insightType={insight.type}
                type={"icon"}
                boundaryRef={tooltipBoundaryRef}
              />
            ];

            if (isJaegerEnabled && traceId) {
              buttons.push(
                <Button
                  key={"trace"}
                  icon={TraceIcon}
                  onClick={handleTraceButtonClick(
                    {
                      name: spanName,
                      id: traceId
                    },
                    insight.type,
                    spanCodeObjectId
                  )}
                />
              );
            }
            return (
              <ListItem
                key={spanCodeObjectId}
                name={spanName}
                onClick={handleLinkClick(spanCodeObjectId)}
                endContent={buttons}
              />
            );
          })}
        </s.Details>
      );
    }
  };

  const handleEndpointLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleEndpointTraceButtonClick =
    (
      endpoint: AffectedEndpoint,
      insightType: InsightType,
      spanCodeObjectId?: string
    ) =>
    () => {
      if (isNull(endpoint.sampleTraceId)) {
        return;
      }

      onTraceButtonClick(
        {
          name: endpoint.displayName,
          id: endpoint.sampleTraceId
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
        ? affectedEndpoints.find(
            (x) => getEndpointKey(x) === selectedEndpointKey
          )
        : undefined,
    [selectedEndpointKey, affectedEndpoints]
  );

  const durationRangeString = `${getDurationString(
    insight.minDuration
  )} - ${getDurationString(insight.maxDuration)}`;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <s.InsightDescription>
            {insight.shortDisplayInfo.description}
          </s.InsightDescription>
          <ColumnsContainer>
            <KeyValue label={"Tested concurrency"}>
              {insight.maxConcurrency}
            </KeyValue>
            <KeyValue
              label={"Duration"}
              info={
                "The execution time range from minimal  to maximum duration"
              }
            >
              {durationRangeString}
            </KeyValue>
          </ColumnsContainer>
          {renderRootCause(insight.rootCauseSpans)}
          {affectedEndpoints.length > 0 && (
            <s.Details>
              <Description>
                Affected Endpoints ({affectedEndpoints.length})
              </Description>
              <s.SelectContainer>
                <AffectedEndpointsSelector
                  onChange={handleAffectedEndpointsSelectorChange}
                  onAssetLinkClick={handleEndpointLinkClick}
                  value={selectedEndpointKey}
                  options={selectorOptions}
                  isDisabled={selectorOptions.length === 0}
                />
                {isJaegerEnabled && selectedEndpoint?.sampleTraceId && (
                  <Tooltip title={"Open Trace"}>
                    <Button
                      icon={TraceIcon}
                      onClick={handleEndpointTraceButtonClick(
                        selectedEndpoint,
                        insight.type,
                        insight.spanInfo?.spanCodeObjectId
                      )}
                    />
                  </Tooltip>
                )}
              </s.SelectContainer>
            </s.Details>
          )}
        </ContentContainer>
      }
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      onJiraButtonClick={
        insight.rootCauseSpans.length == 0
          ? handleTicketInfoButtonClick
          : undefined
      }
      onOpenHistogram={insight.spanInfo ? onHistogramButtonClick : undefined}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={durationRangeString}>
          <span>{durationRangeString}</span>
        </Tooltip>
      }
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
