import { useContext } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { roundTo } from "../../../utils/roundTo";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Pagination } from "../../common/Pagination";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { TopUsageInsightProps } from "./types";

const PAGE_SIZE = 3;

export const TopUsageInsight = (props: TopUsageInsightProps) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.flows,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleServiceLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId && props.onAssetLinkClick(spanCodeObjectId);
  };

  const handleTraceButtonClick = (trace: Trace) => {
    props.onTraceButtonClick(trace, props.insight.type);
  };

  return (
    <InsightCard
      data={props.insight}
      content={
        <s.FlowList>
          {pageItems.map((flow, i) => {
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
                    {flow.lastServiceSpan && <> -&gt; {flow.lastServiceSpan}</>}
                  </span>
                </s.FlowData>
                {config.isJaegerEnabled && traceId && (
                  <s.Button
                    icon={{ component: CrosshairIcon }}
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
          <Pagination
            itemsCount={props.insight.flows.length}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </s.FlowList>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
