import { ReactNode, useState } from "react";
import { useGlobalStore } from "../../../../../../containers/Main/stores/useGlobalStore";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../common/v3/Button";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightType, NPlusOneEndpointInfo, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { EndpointSelectedOption } from "../common/InsightCard/EndpointSelectedOption";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { Select } from "../common/InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpaNPlusOneInsightCardProps } from "./types";

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
        <EndpointSelectedOption
          serviceName={x.endpointInfo.serviceName}
          route={route}
          spanCodeObjectId={spanCodeObjectId}
          onClick={handleLinkClick}
        />
      ),
      value: spanCodeObjectId
    };
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
  viewMode
}: SpaNPlusOneInsightCardProps) => {
  const endpoints = insight.endpoints ?? [];
  const endpointWithMaxDuration = endpoints.reduce(
    (acc, cur) => (acc.duration.raw >= cur.duration.raw ? acc : cur),
    endpoints[0]
  );
  const maxDurationString = getDurationString(endpointWithMaxDuration.duration);
  const isJaegerEnabled = useGlobalStore.use.isJaegerEnabled();
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    endpoints.length ? endpoints[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && onAssetLinkClick(spanCodeObjectId, insight.type);
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
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  return (
    <InsightCard
      insight={insight}
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
                    ) ?? null;

                  setSelectedEndpoint(selected);
                }}
                options={renderOptions(endpoints, handleSpanLinkClick)}
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
