import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { Description } from "../styles";
import * as s from "./styles";
import { EndpointChattyApiV2InsightProps } from "./types";

export const EndpointChattyApiV2Insight = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: EndpointChattyApiV2InsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const spanName = insight.span.clientSpan.displayName;
  const traceId = insight.span.traceId;
  const spanCodeObjectId = insight.span.clientSpan.spanCodeObjectId;

  return (
    <InsightCard
      insight={insight}
      content={
        <s.Container>
          <Description>
            Excessive API calls to specific endpoint found
          </Description>
          <s.SpanListItem
            name={spanName}
            onClick={() => handleSpanLinkClick(spanCodeObjectId)}
          />
        </s.Container>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      onGoToTrace={
        traceId
          ? () =>
              handleTraceButtonClick(
                {
                  name: spanName,
                  id: traceId
                },
                insight.type,
                spanCodeObjectId
              )
          : undefined
      }
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
