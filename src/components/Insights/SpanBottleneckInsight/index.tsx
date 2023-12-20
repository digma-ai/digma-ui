import { roundTo } from "../../../utils/roundTo";
import { Tooltip } from "../../common/Tooltip";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import * as s from "./styles";
import { SpanBottleneckInsightProps } from "./types";

export const SpanBottleneckInsight = (props: SpanBottleneckInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <>
          <Description>
            The following spans are slowing request handling
          </Description>
          <s.SpanList>
            {props.insight.spans.map((span) => {
              const spanName = span.spanInfo.displayName;
              const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

              return (
                <s.SpanContainer key={spanCodeObjectId}>
                  <Tooltip title={spanName}>
                    <s.Span>
                      <Link
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      >
                        {spanName}
                      </Link>
                    </s.Span>
                  </Tooltip>
                  <Description>
                    {`Slowing ${roundTo(
                      span.probabilityOfBeingBottleneck * 100,
                      2
                    )}% of the requests (~${
                      span.avgDurationWhenBeingBottleneck.value
                    } ${span.avgDurationWhenBeingBottleneck.unit})`}
                  </Description>
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
