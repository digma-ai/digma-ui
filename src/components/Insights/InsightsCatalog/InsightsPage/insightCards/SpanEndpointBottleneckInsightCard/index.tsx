import { useState } from "react";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import { isNull } from "../../../../../../typeGuards/isNull";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../common/v3/Button";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../../types";
import { AffectedEndpointsSelector } from "../../AffectedEndpointsSelector";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanEndpointBottleneckInsightCardProps } from "./types";

export const SpanEndpointBottleneckInsightCard = ({
  insight,
  onJiraTicketCreate,
  onAssetLinkClick,
  onTraceButtonClick,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode
}: SpanEndpointBottleneckInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();
  const slowEndpoints = insight.slowEndpoints ?? [];
  const endpointWithMaxDuration = slowEndpoints.reduce(
    (acc, cur) =>
      acc.avgDurationWhenBeingBottleneck.raw >=
      cur.avgDurationWhenBeingBottleneck.raw
        ? acc
        : cur,
    slowEndpoints[0]
  );
  const maxDurationString = getDurationString(
    endpointWithMaxDuration.avgDurationWhenBeingBottleneck
  );
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    slowEndpoints.length > 0 ? slowEndpoints[0] : null
  );

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

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

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
              Affected Endpoints ({slowEndpoints.length})
            </Description>
            <s.SelectContainer>
              <AffectedEndpointsSelector
                insightType={insight.type}
                onChange={(selectedOption) => {
                  const selected =
                    slowEndpoints.find(
                      (x) =>
                        x.endpointInfo.spanCodeObjectId ===
                        selectedOption?.spanCodeObjectId
                    ) ?? null;

                  setSelectedEndpoint(selected);
                }}
                onAssetLinkClick={handleSpanLinkClick}
                value={selectedEndpoint?.endpointInfo.spanCodeObjectId}
                options={slowEndpoints.map((x) => ({
                  route: trimEndpointScheme(x.endpointInfo.route),
                  serviceName: x.endpointInfo.serviceName,
                  spanCodeObjectId: x.endpointInfo.spanCodeObjectId
                }))}
              />
              {isJaegerEnabled && selectedEndpoint?.traceId && (
                <Tooltip title={"Open Trace"}>
                  <Button
                    icon={TraceIcon}
                    onClick={() => {
                      if (isNull(selectedEndpoint.traceId)) {
                        return;
                      }

                      handleTraceButtonClick(
                        {
                          name: selectedEndpoint.endpointInfo.route,
                          id: selectedEndpoint.traceId
                        },
                        insight.type,
                        insight.spanInfo?.spanCodeObjectId
                      );
                    }}
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
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
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
