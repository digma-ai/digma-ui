import { useContext } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { InsightType } from "../../../../../../types";
import { roundTo } from "../../../../../../utils/roundTo";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { Pagination } from "../../../../../common/Pagination";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { TopUsageInsightProps } from "./types";

const PAGE_SIZE = 3;

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const TopUsageInsight = (props: TopUsageInsightProps) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.flows,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleServiceLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId &&
      props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
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
                  {flow.intermediateSpan && (
                    <span> -&gt; {flow.intermediateSpan}</span>
                  )}
                  {flow.lastService && (
                    <s.FullSpanName>
                      <Description>
                        {" "}
                        -&gt; {flow.lastService.service}
                      </Description>
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
                  )}
                  {flow.lastServiceSpan && (
                    <span> -&gt; {flow.lastServiceSpan}</span>
                  )}
                </s.FlowData>
                {config.isJaegerEnabled && traceId && (
                  <s.Button
                    icon={{ component: CrosshairIcon }}
                    onClick={() =>
                      handleTraceButtonClick(
                        {
                          name: firstServiceName,
                          id: traceId
                        },
                        props.insight.type,
                        props.insight.spanInfo?.spanCodeObjectId
                      )
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
