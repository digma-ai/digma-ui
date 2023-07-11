import { roundTo } from "../../../utils/roundTo";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { TopUsageInsightProps } from "./types";

export const TopUsageInsight = (props: TopUsageInsightProps) => {
  const handleServiceLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && props.onAssetLinkClick(spanCodeObjectId);
  };

  const handleTraceButtonClick = (trace: Trace) => {
    props.onTraceButtonClick(trace);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.FlowList>
          <Pagination
            id={`${props.insight.codeObjectId}_${props.insight.type}`}
          >
            {props.insight.flows.map((flow, i) => {
              const firstServiceName = `${flow.firstService.service}:${flow.firstService.span}`;
              const traceId = flow.sampleTraceIds[0];

              return (
                <s.Flow key={i}>
                  <s.FlowData>
                    <span>{roundTo(flow.percentage, 2)}% </span>
                    <s.FullSpanName>
                      <Description>{flow.firstService.service}</Description>
                      <Link
                        onClick={() =>
                          handleServiceLinkClick(
                            flow.firstService.spanCodeObjectId
                          )
                        }
                      >
                        {flow.firstService.span}
                      </Link>
                    </s.FullSpanName>
                    <span>
                      {flow.intermediateSpan && (
                        <> -&gt; {flow.intermediateSpan}</>
                      )}
                    </span>
                    {flow.lastService ? (
                      <s.FullSpanName>
                        <Description>{flow.lastService.service}</Description>
                        <Link
                          onClick={() =>
                            handleServiceLinkClick(
                              flow.lastService?.spanCodeObjectId
                            )
                          }
                        >
                          {flow.lastService.span}
                        </Link>
                      </s.FullSpanName>
                    ) : null}
                    <span>
                      {flow.lastServiceSpan && (
                        <> -&gt; {flow.lastServiceSpan}</>
                      )}
                    </span>
                  </s.FlowData>
                  {traceId && (
                    <s.Button
                      icon={{ component: CrosshairIcon, size: 16 }}
                      onClick={() =>
                        handleTraceButtonClick({
                          name: firstServiceName,
                          id: traceId
                        })
                      }
                    >
                      Trace
                    </s.Button>
                  )}
                </s.Flow>
              );
            })}
          </Pagination>
        </s.FlowList>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
