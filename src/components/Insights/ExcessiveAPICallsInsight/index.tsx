import { useContext } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { InsightType } from "../../../types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Pagination } from "../../common/Pagination";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Criticality } from "../common/Criticality";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { ExcessiveAPICallsInsightProps } from "./types";

const PAGE_SIZE = 3;

export const ExcessiveAPICallsInsight = (
  props: ExcessiveAPICallsInsightProps
) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.spans,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      title={props.insight.spanInfo?.displayName}
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
                    <s.Button
                      icon={{ component: CrosshairIcon }}
                      onClick={() =>
                        handleTraceButtonClick(
                          {
                            name: spanName,
                            id: traceId
                          },
                          props.insight.type,
                          spanCodeObjectId
                        )
                      }
                    >
                      Trace
                    </s.Button>
                  )}
                </s.Span>
              );
            })}
            <Pagination
              itemsCount={props.insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </s.List>
          <Criticality value={props.insight.criticality} />
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
