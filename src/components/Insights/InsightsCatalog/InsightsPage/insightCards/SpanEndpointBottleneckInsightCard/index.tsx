import { ReactNode, useContext, useState } from "react";
import { isNull } from "../../../../../../typeGuards/isNull";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../common/v3/Button";
import { Link } from "../../../../../common/v3/Link";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { BottleneckEndpointInfo, InsightType, Trace } from "../../../../types";
import { Info } from "../common/Info";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { Select } from "../common/InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { SpanEndpointBottleneckInsightCardProps } from "./types";

const renderOptions = (
  endpoints: BottleneckEndpointInfo[],
  handleLinkClick: (spanCodeObjectId?: string) => void
): { label: string; customContent: ReactNode; value: string }[] =>
  endpoints.map((x) => {
    const spanCodeObjectId = x.endpointInfo.spanCodeObjectId;
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

export const SpanEndpointBottleneckInsightCard = ({
  insight,
  onJiraTicketCreate,
  onAssetLinkClick,
  onTraceButtonClick,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: SpanEndpointBottleneckInsightCardProps) => {
  const config = useContext(ConfigContext);
  const slowEndpoints = insight.slowEndpoints || [];
  const [selectedEndpoint, setSelectedEndpoint] = useState(
    slowEndpoints.length > 0 ? slowEndpoints[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
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
              <Select
                value={selectedEndpoint?.endpointInfo.spanCodeObjectId}
                onChange={(selectedOption) => {
                  const selected =
                    slowEndpoints.find(
                      (x) => x.endpointInfo.spanCodeObjectId === selectedOption
                    ) || null;

                  setSelectedEndpoint(selected);
                }}
                options={renderOptions(slowEndpoints, handleSpanLinkClick)}
              />
              {config.isJaegerEnabled &&
                selectedEndpoint &&
                selectedEndpoint.traceId && (
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
                          selectedEndpoint.endpointInfo.spanCodeObjectId
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
                label={
                  <Info
                    text={
                      "The percentage of the overall request time taken up by this bottleneck asset"
                    }
                    name={"% of Duration"}
                  />
                }
              >
                {selectedEndpoint.avgFractionWhenBeingBottleneck}%
              </KeyValue>
              <KeyValue
                label={
                  <Info
                    text={
                      "The percentage of requests for the selected endpoint experiencing this bottleneck"
                    }
                    name={"% of Requests"}
                  />
                }
              >
                {selectedEndpoint.requestPercentage}%
              </KeyValue>
              <KeyValue label={"Duration"}>
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
    />
  );
};
