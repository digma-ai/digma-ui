import { useContext } from "react";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { SessionInViewInsightProps } from "./types";

export const SessionInViewInsight = (props: SessionInViewInsightProps) => {
  const config = useContext(ConfigContext);

  const handleLinkClick = (spanCodeObjectId: string) => {
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
          <Description>
            Query execution was detected during the view rendering.
          </Description>
          <s.List>
            <Pagination
              id={`${props.insight.codeObjectId}_${props.insight.type}`}
            >
              {props.insight.spans.map((span) => {
                const spanName = span.renderSpan.displayName;
                const traceId = span.traceId;
                const spanCodeObjectId = span.renderSpan.spanCodeObjectId;

                return (
                  <s.Span key={spanCodeObjectId}>
                    <Tooltip title={spanName}>
                      <s.SpanName>
                        <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
                          {spanName}
                        </Link>
                      </s.SpanName>
                    </Tooltip>
                    {config.isJaegerEnabled && traceId && (
                      <s.Button
                        icon={{ component: CrosshairIcon }}
                        onClick={() =>
                          handleTraceButtonClick({
                            name: spanName,
                            id: traceId
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
          </s.List>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
