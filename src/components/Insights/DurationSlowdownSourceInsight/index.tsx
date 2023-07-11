import { DurationChange } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
import { DurationSlowdownSource } from "../types";
import * as s from "./styles";
import { DurationSlowdownSourceInsightProps } from "./types";

export const DurationSlowdownSourceInsight = (
  props: DurationSlowdownSourceInsightProps
) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
  };

  const p50Sources = props.insight.durationSlowdownSources.filter(
    (x) => x.percentile === "0.5"
  );

  const p95Sources = props.insight.durationSlowdownSources.filter(
    (x) => x.percentile === "0.95"
  );

  const renderSourceList = (sources: DurationSlowdownSource[]) => (
    <s.SourceList>
      {sources.map((x) => {
        const spanName = x.spanInfo.displayName;
        const spanCodeObjectId = x.spanInfo.spanCodeObjectId;

        return (
          <s.Source key={spanCodeObjectId}>
            <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
              {spanName}
            </Link>
            <DurationChange
              currentDuration={x.currentDuration}
              previousDuration={x.previousDuration}
              changeTime={x.changeTime}
              changeVerified={x.changeVerified}
            />
          </s.Source>
        );
      })}
    </s.SourceList>
  );

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.Container>
          <s.Description>Found spans slowing the endpoint</s.Description>
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
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
