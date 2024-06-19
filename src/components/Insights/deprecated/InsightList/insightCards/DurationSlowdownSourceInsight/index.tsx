import { Tooltip } from "../../../../../common/Tooltip";
import { Description, Link } from "../../../../styles";
import { DurationSlowdownSource } from "../../../../types";
import { DurationChange } from "../../DurationChange";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { DurationSlowdownSourceInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const DurationSlowdownSourceInsight = ({
  insight,
  onAssetLinkClick,
  onRecalculate,
  onRefresh
}: DurationSlowdownSourceInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const p50Sources = insight.durationSlowdownSources.filter(
    (x) => x.percentile === "0.5"
  );

  const p95Sources = insight.durationSlowdownSources.filter(
    (x) => x.percentile === "0.95"
  );

  const renderSourceList = (sources: DurationSlowdownSource[]) => (
    <s.SourceList>
      {sources.map((x) => {
        const spanName = x.spanInfo.displayName;
        const spanCodeObjectId = x.spanInfo.spanCodeObjectId;

        return (
          <s.Source key={spanCodeObjectId}>
            <Tooltip title={spanName}>
              <s.SourceName>
                <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                  {spanName}
                </Link>
              </s.SourceName>
            </Tooltip>
            <s.DurationChangeContainer>
              <DurationChange
                currentDuration={x.currentDuration}
                previousDuration={x.previousDuration}
                changeTime={x.changeTime}
                changeVerified={x.changeVerified}
              />
            </s.DurationChangeContainer>
          </s.Source>
        );
      })}
    </s.SourceList>
  );

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.Container>
          <Description>Found spans slowing the endpoint</Description>
          {p50Sources.length > 0 && (
            <>
              <span>Affecting most requests:</span>
              {renderSourceList(p50Sources)}
            </>
          )}
          {p95Sources.length > 0 && (
            <>
              <span>Affecting ~5% of requests:</span>
              {renderSourceList(p95Sources)}
            </>
          )}
        </s.Container>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
