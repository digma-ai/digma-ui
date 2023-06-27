import { roundTo } from "../../../utils/roundTo";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Pagination } from "../Pagination";
import { Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { TopUsageInsightProps } from "./types";

export const TopUsageInsight = (props: TopUsageInsightProps) => {
  const handleServiceLinkClick = () => {
    // TODO
  };

  const handleTraceButtonClick = (trace: Trace) => {
    // TODO
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
              const lastServiceName = flow.lastService
                ? `${flow.lastService.service}:${flow.lastService.span}`
                : "";
              const traceId = flow.sampleTraceIds[0];

              return (
                <s.Flow key={i}>
                  <s.FlowData>
                    <span>
                      {roundTo(flow.percentage, 2)}%{" "}
                      <Link onClick={() => handleServiceLinkClick()}>
                        {firstServiceName}
                      </Link>
                    </span>
                    <span>
                      {flow.intermediateSpan && (
                        <> -&gt; {flow.intermediateSpan}</>
                      )}
                    </span>
                    <span>
                      {flow.lastService ? (
                        <Link onClick={() => handleServiceLinkClick()}>
                          {lastServiceName}
                        </Link>
                      ) : null}
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
    />
  );
};
