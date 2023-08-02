import { useContext } from "react";
import { ConfigContext } from "../../common/App/ConfigContext";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { NPlusOneInsightProps } from "./types";

export const NPlusOneInsight = (props: NPlusOneInsightProps) => {
  const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && props.onAssetLinkClick(spanCodeObjectId);
  };

  const handleTraceButtonClick = (trace: Trace) => {
    props.onTraceButtonClick(trace, props.insight.type);
  };

  const spanName = props.insight.clientSpanName || undefined;
  const spanCodeObjectId = props.insight.clientSpanCodeObjectId || undefined;
  const traceId = props.insight.traceId;

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.ContentContainer>
          <Description>Check the following SELECT statement:</Description>
          <s.SpanContainer>
            <s.Name>
              {spanCodeObjectId ? (
                <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                  {spanName}
                </Link>
              ) : (
                spanName
              )}
            </s.Name>
            {config.isJaegerEnabled && traceId && (
              <s.Button
                onClick={() =>
                  handleTraceButtonClick({
                    name: spanName,
                    id: traceId
                  })
                }
                icon={{ component: CrosshairIcon }}
              >
                Trace
              </s.Button>
            )}
          </s.SpanContainer>
          <s.Stats>
            <s.Stat>
              <Description>Repeats</Description>
              <span>{props.insight.occurrences} (median)</span>
            </s.Stat>
            <s.Stat>
              <Description>Duration</Description>
              <span>
                {props.insight.duration.value} {props.insight.duration.unit}
              </span>
            </s.Stat>
          </s.Stats>
          <Description>Affected endpoints:</Description>
          <div>
            {props.insight.endpoints.map((x) => {
              const spanCodeObjectId = x.endpointInfo.entrySpanCodeObjectId;
              return (
                <s.Endpoint key={spanCodeObjectId}>
                  <s.Name>
                    <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                      {x.endpointInfo.route}
                    </Link>
                  </s.Name>
                  <s.Stat>
                    <Description>Repeats</Description>
                    <span>{x.occurrences} (median)</span>
                  </s.Stat>
                </s.Endpoint>
              );
            })}
          </div>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
