import { roundTo } from "../../../utils/roundTo";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { EndpointNPlusOneInsightProps } from "./types";

const FRACTION_MIN_LIMIT = 0.01;

export const EndpointNPlusOneInsight = (
  props: EndpointNPlusOneInsightProps
) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
  };

  const handleTraceButtonClick = (trace: Trace) => {
    props.onTraceButtonClick(trace, props.insight.type);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <s.Description>Check the following locations:</s.Description>
          <s.SpanList>
            <Pagination
              id={`${props.insight.codeObjectId}_${props.insight.type}`}
            >
              {props.insight.spans.map((span) => {
                const spanInfo = span.internalSpan || span.clientSpan;
                const spanName = spanInfo.displayName;
                const fraction =
                  span.fraction < FRACTION_MIN_LIMIT
                    ? "minimal"
                    : `${roundTo(span.fraction, 2)} of request`;

                return (
                  <s.Span key={spanName}>
                    <Link
                      onClick={() =>
                        handleSpanLinkClick(spanInfo.spanCodeObjectId)
                      }
                    >
                      {spanName}
                    </Link>
                    <s.Stats>
                      <s.Stat>
                        <s.Description>Impact</s.Description>
                        <span>{fraction}</span>
                      </s.Stat>
                      <s.Stat>
                        <s.Description>Repeats</s.Description>
                        <span>{span.occurrences}</span>
                      </s.Stat>
                      <s.Stat>
                        <s.Description>Duration</s.Description>
                        <span>
                          {span.duration.value} {span.duration.unit}
                        </span>
                      </s.Stat>
                    </s.Stats>
                    <s.Button
                      icon={{ component: CrosshairIcon, size: 16 }}
                      onClick={() =>
                        handleTraceButtonClick({
                          name: spanName,
                          id: span.traceId
                        })
                      }
                    >
                      Trace
                    </s.Button>
                  </s.Span>
                );
              })}
            </Pagination>
          </s.SpanList>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
