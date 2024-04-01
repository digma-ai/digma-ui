import { ReactNode, useState } from "react";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { Link } from "../../../../../common/v3/Link";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import {
  EndpointQueryOptimizationSpan,
  InsightType,
  Trace
} from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { Select } from "../common/InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { EndpointQueryOptimizationInsightCardProps } from "./types";

const renderOptions = (
  spans: EndpointQueryOptimizationSpan[],
  handleLinkClick: (spanCodeObjectId: string) => void
): { label: string; customContent: ReactNode; value: string }[] =>
  spans.map((x) => {
    const spanCodeObjectId = x.spanInfo.spanCodeObjectId;
    const name = x.spanInfo.displayName;

    return {
      label: name,
      customContent: (
        <s.SelectedItem>
          <Tooltip title={name}>
            <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
              {name}
            </Link>
          </Tooltip>
        </s.SelectedItem>
      ),
      value: spanCodeObjectId
    };
  });

/**
 * @deprecated
 */
export const EndpointQueryOptimizationInsightCard = ({
  insight,
  onAssetLinkClick,
  onJiraTicketCreate,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  isJiraHintEnabled,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: EndpointQueryOptimizationInsightCardProps) => {
  const [selectedSpan, setSelectedSpan] = useState(
    insight.spans ? insight.spans[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
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
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Check the following locations:</Description>
            <Select
              value={selectedSpan?.spanInfo.spanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  insight.spans.find(
                    (x) => x.spanInfo.spanCodeObjectId === selectedOption
                  ) || null;

                setSelectedSpan(selected);
              }}
              options={renderOptions(insight.spans, handleSpanLinkClick)}
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
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToTrace={
        selectedSpan?.traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: selectedSpan?.spanInfo.displayName,
                  id: selectedSpan?.traceId
                },
                insight.type,
                selectedSpan?.spanInfo.spanCodeObjectId
              )
          : undefined
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: selectedSpan?.ticketLink,
        spanCodeObjectId: selectedSpan?.spanInfo.spanCodeObjectId,
        isHintEnabled: isJiraHintEnabled
      }}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
