import { EndpointSlowdownSource } from "../../../types";
import { DurationChange } from "../../DurationChange";
import { InsightCard } from "../../InsightCard";
import { ListItem } from "../../InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { EndpointSlowdownSourceInsightProps } from "./types";

export const EndpointSlowdownSourceInsight = (
  props: EndpointSlowdownSourceInsightProps
) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const p50Sources = props.insight.endpointSlowdownSources?.filter(
    (x) => x.percentile === "0.5"
  );

  const p95Sources = props.insight.endpointSlowdownSources?.filter(
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
            onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            name={spanName}
            buttons={[
              <DurationChange
                key={"duration"}
                currentDuration={x.currentDuration}
                previousDuration={x.previousDuration}
                changeTime={x.changeTime}
              />
            ]}
          />
        );
      })}
    </s.SourceList>
  );

  return (
    <InsightCard
      insight={props.insight}
      content={
        <ContentContainer>
          <s.InsightDescription>
            Found spans slowing the endpoint
          </s.InsightDescription>
          {p50Sources?.length && (
            <>
              <Description>Affecting most requests:</Description>
              {renderSourceList(p50Sources)}
            </>
          )}
          {p95Sources?.length && (
            <>
              <Description>Affecting ~5% of requests:</Description>
              {renderSourceList(p95Sources)}
            </>
          )}
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
