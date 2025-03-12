import type { InsightType } from "../../../../../../../types";
import { Tag } from "../../../../../../common/v3/Tag";
import type { Trace } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { AssetLink } from "../styles";
import * as s from "./styles";
import type { EndpointChattyApiV2InsightCardProps } from "./types";

export const EndpointChattyApiV2InsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: EndpointChattyApiV2InsightCardProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => () => {
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
  const repeats = insight.span.repeats;

  return (
    <InsightCard
      insight={insight}
      content={
        <s.Container>
          <ColumnsContainer>
            <s.DescriptionColumn
              label={"Excessive API calls to specific endpoint found"}
            >
              <AssetLink
                name={spanName}
                onClick={handleSpanLinkClick(spanCodeObjectId)}
              />
            </s.DescriptionColumn>
            <KeyValue label={"Repeats"}>
              <Tag content={repeats} title={repeats} />
            </KeyValue>
          </ColumnsContainer>
        </s.Container>
      }
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
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
