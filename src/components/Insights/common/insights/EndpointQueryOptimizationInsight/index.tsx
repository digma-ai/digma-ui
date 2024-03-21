import { ReactNode, useState } from "react";
import { getDurationString } from "../../../../../utils/getDurationString";
import { Link } from "../../../../common/v3/Link";
import { Tooltip } from "../../../../common/v3/Tooltip";
import {
  EndpointQueryOptimizationSpan,
  InsightType,
  Trace
} from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ColumnsContainer } from "../../InsightCard/ColumnsContainer";
import { KeyValue } from "../../InsightCard/KeyValue";
import { Select } from "../../InsightCard/Select";
import { ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import { EndpointQueryOptimizationInsightProps } from "./types";

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

export const EndpointQueryOptimizationInsight = (
  props: EndpointQueryOptimizationInsightProps
) => {
  const [selectedSpan, setSelectedSpan] = useState(
    props.insight.spans ? props.insight.spans[0] : null
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <Details>
            <Description>Check the following locations:</Description>
            <Select
              value={selectedSpan?.spanInfo.spanCodeObjectId}
              onChange={(selectedOption) => {
                const selected =
                  props.insight.spans.find(
                    (x) => x.spanInfo.spanCodeObjectId === selectedOption
                  ) || null;

                setSelectedSpan(selected);
              }}
              options={renderOptions(props.insight.spans, handleSpanLinkClick)}
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToTrace={
        selectedSpan?.traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: selectedSpan?.spanInfo.displayName,
                  id: selectedSpan?.traceId
                },
                props.insight.type,
                selectedSpan?.spanInfo.spanCodeObjectId
              )
          : undefined
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: selectedSpan?.ticketLink,
        spanCodeObjectId: selectedSpan?.spanInfo.spanCodeObjectId,
        isHintEnabled: props.isJiraHintEnabled
      }}
      onGoToSpan={props.onGoToSpan}
    />
  );
};
