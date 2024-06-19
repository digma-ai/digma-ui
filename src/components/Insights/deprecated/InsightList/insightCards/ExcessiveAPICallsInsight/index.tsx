import { useContext } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { InsightType } from "../../../../../../types";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { Pagination } from "../../../../../common/Pagination";
import { Tooltip } from "../../../../../common/Tooltip";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import { Criticality } from "../common/Criticality";
import * as s from "./styles";
import { ExcessiveAPICallsInsightProps } from "./types";

const PAGE_SIZE = 3;

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const ExcessiveAPICallsInsight = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh
}: ExcessiveAPICallsInsightProps) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    insight.spans,
    PAGE_SIZE,
    insight.codeObjectId
  );

  const handleLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>
            Excessive API calls to specific endpoint found
          </Description>
          <s.List>
            {pageItems.map((span) => {
              const spanName = span.clientSpan.displayName;
              const traceId = span.traceId;
              const spanCodeObjectId = span.clientSpan.spanCodeObjectId;

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
                    <Tooltip title={"Open Trace"}>
                      <s.Button
                        icon={{ component: CrosshairIcon }}
                        onClick={() =>
                          handleTraceButtonClick(
                            {
                              name: spanName,
                              id: traceId
                            },
                            insight.type,
                            spanCodeObjectId
                          )
                        }
                      >
                        Trace
                      </s.Button>
                    </Tooltip>
                  )}
                </s.Span>
              );
            })}
            <Pagination
              itemsCount={insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </s.List>
          <Criticality value={insight.criticality} />
        </s.ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
