import { HistogramIcon } from "../../../../../../common/icons/16px/HistogramIcon";
import { NewIconButton } from "../../../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type { EndpointSlowdownSource } from "../../../../../types";
import { DurationChange } from "../common/DurationChange";
import { InsightCard } from "../common/InsightCard";
import { ListItem } from "../common/InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import type { EndpointSlowdownSourceInsightCardProps } from "./types";

export const EndpointSlowdownSourceInsightCard = ({
  insight,
  onAssetLinkClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef,
  onHistogramButtonClick
}: EndpointSlowdownSourceInsightCardProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => () => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleHistogramIconButtonClick =
    (source: EndpointSlowdownSource) => () => {
      onHistogramButtonClick(
        source.spanInfo.spanCodeObjectId,
        insight.type,
        source.spanInfo.displayName,
        insight.environment
      );
    };

  const p50Sources = insight.endpointSlowdownSources?.filter(
    (x) => x.percentile === "0.5"
  );

  const p95Sources = insight.endpointSlowdownSources?.filter(
    (x) => x.percentile === "0.95"
  );

  const renderSourceList = (sources: EndpointSlowdownSource[]) => (
    <s.SourceList>
      {sources.map((x) => {
        const spanName = x.spanInfo.displayName;
        const spanCodeObjectId = x.spanInfo.spanCodeObjectId;

        return (
          <ListItem
            key={spanCodeObjectId}
            onClick={handleSpanLinkClick(spanCodeObjectId)}
            name={spanName}
            endContent={
              <>
                <DurationChange
                  key={"duration"}
                  currentDuration={x.currentDuration}
                  previousDuration={x.previousDuration}
                  changeTime={x.changeTime}
                />
                <Tooltip title={"Open Histogram"}>
                  <NewIconButton
                    icon={HistogramIcon}
                    onClick={handleHistogramIconButtonClick(x)}
                  />
                </Tooltip>
              </>
            }
          />
        );
      })}
    </s.SourceList>
  );

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <s.InsightDescription>
            Found spans slowing the endpoint
          </s.InsightDescription>
          {p50Sources && p50Sources.length > 0 && (
            <>
              <Description>Affecting most requests:</Description>
              {renderSourceList(p50Sources)}
            </>
          )}
          {p95Sources && p95Sources.length > 0 && (
            <>
              <Description>Affecting ~5% of requests:</Description>
              {renderSourceList(p95Sources)}
            </>
          )}
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
