import { useContext } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { InsightType } from "../../../types";
import { roundTo } from "../../../utils/roundTo";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Pagination } from "../../common/Pagination";
import { Tooltip } from "../../common/Tooltip";
import { CrosshairIcon } from "../../common/icons/CrosshairIcon";
import { InsightCard } from "../InsightCard";
import { Description, Link } from "../styles";
import { Trace } from "../types";
import * as s from "./styles";
import { EndpointNPlusOneInsightProps } from "./types";

const FRACTION_MIN_LIMIT = 0.01;
const PAGE_SIZE = 3;

export const EndpointNPlusOneInsight = (
  props: EndpointNPlusOneInsightProps
) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.spans,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId);
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
      content={
        <s.ContentContainer>
          <Description>Check the following locations:</Description>
          <s.SpanList>
            {pageItems.map((span) => {
              const spanInfo = span.internalSpan || span.clientSpan;
              const spanName = spanInfo.displayName;
              const fraction =
                span.fraction < FRACTION_MIN_LIMIT
                  ? "minimal"
                  : `${roundTo(span.fraction, 2)} of request`;

              return (
                <s.Span key={spanName}>
                  <s.SpanDetails>
                    <Tooltip title={spanName}>
                      <s.SpanName>
                        <Link
                          onClick={() =>
                            handleSpanLinkClick(spanInfo.spanCodeObjectId)
                          }
                        >
                          {spanName}
                        </Link>
                      </s.SpanName>
                    </Tooltip>
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
                        handleTraceButtonClick(
                          {
                            name: spanName,
                            id: span.traceId
                          },
                          props.insight.type,
                          spanInfo.spanCodeObjectId
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
          </s.SpanList>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
