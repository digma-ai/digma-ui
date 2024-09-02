import { useState } from "react";
import { useConfigSelector } from "../../../../../../store/config/useConfigSelector";
import { getDurationString } from "../../../../../../utils/getDurationString";
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
  const endpoints = insight.endpoints ?? [];
  const endpointWithMaxDuration = endpoints.reduce(
    (acc, cur) => (acc.duration.raw >= cur.duration.raw ? acc : cur),
    endpoints[0]
  );
  const maxDurationString = getDurationString(endpointWithMaxDuration.duration);
  const { isJaegerEnabled } = useConfigSelector();
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    endpoints.length ? endpoints[0] : null
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

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Affected Endpoints ({endpoints.length})</Description>
            <s.SelectContainer>
              <AffectedEndpointsSelector
                value={selectedEndpoint?.endpointInfo.entrySpanCodeObjectId}
                onChange={(selectedOption) => {
                  const selected =
                    endpoints.find(
                      (x) =>
                        x.endpointInfo.entrySpanCodeObjectId ===
                        selectedOption?.spanCodeObjectId
                    ) ?? null;

                  setSelectedEndpoint(selected);
                }}
                options={endpoints.map((x) => ({
                  route: x.endpointInfo.route,
                  serviceName: x.endpointInfo.serviceName,
                  spanCodeObjectId: x.endpointInfo.entrySpanCodeObjectId
                }))}
                insightType={insight.type}
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
              <KeyValue label={"Repeats"}>
                {selectedEndpoint.occurrences}
              </KeyValue>
              <KeyValue
                label={"Requests"}
                info={"The amount of requests affected by this issue."}
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
