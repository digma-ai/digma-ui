import { useContext } from "react";
import { roundTo } from "../../../utils/roundTo";
import { ConfigContext } from "../../common/App/ConfigContext";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { EndpointNPlusOneInsightProps } from "./types";

const FRACTION_MIN_LIMIT = 0.01;

export const EndpointNPlusOneInsight = (
  props: EndpointNPlusOneInsightProps
) => {
  const config = useContext(ConfigContext);

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
          <Description>Check the following locations:</Description>
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
                    <s.SpanDetails>
                      <s.SpanName>
                        <Link
                          onClick={() =>
                            handleSpanLinkClick(spanInfo.spanCodeObjectId)
                          }
                        >
                          {spanName}
                        </Link>
                      </s.SpanName>
                      <s.Stats>
                        <s.Stat>
                          <Description>Impact</Description>
                          <span>{fraction}</span>
                        </s.Stat>
                        <s.Stat>
                          <Description>Repeats</Description>
                          <span>{span.occurrences}</span>
                        </s.Stat>
                        <s.Stat>
                          <Description>Duration</Description>
                          <span>
                            {span.duration.value} {span.duration.unit}
                          </span>
                        </s.Stat>
                      </s.Stats>
                    </s.SpanDetails>
                    {config.isJaegerEnabled && (
                      <s.Button
                        icon={{ component: CrosshairIcon }}
                        onClick={() =>
                          handleTraceButtonClick({
                            name: spanName,
                            id: span.traceId
                          })
                        }
                      >
                        Trace
                      </s.Button>
                    )}
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
