import { roundTo } from "../../../utils/roundTo";
import { InsightCard } from "../InsightCard";
import { Link } from "../styles";
import * as s from "./styles";
import { SpanBottleneckInsightProps } from "./types";

export const SpanBottleneckInsight = (props: SpanBottleneckInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <>
          <s.Description>
            The following spans are slowing request handling
          </s.Description>
          <s.SpanList>
            {props.insight.spans.map((span) => {
              const spanName = span.spanInfo.displayName;
              const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

              return (
                <s.SpanContainer key={spanCodeObjectId}>
                  <s.Span>
                    <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                      {spanName}
                    </Link>
                  </s.Span>
                  <s.Description>
                    {`Slowing ${roundTo(
                      span.probabilityOfBeingBottleneck * 100,
                      2
                    )}% of the requests (~${
                      span.avgDurationWhenBeingBottleneck.value
                    } ${span.avgDurationWhenBeingBottleneck.unit})`}
                  </s.Description>
                </s.SpanContainer>
              );
            })}
          </s.SpanList>
        </>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
