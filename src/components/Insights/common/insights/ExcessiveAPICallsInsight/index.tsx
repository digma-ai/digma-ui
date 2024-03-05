import { useContext } from "react";
import { usePagination } from "../../../../../hooks/usePagination";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { TargetIcon } from "../../../../common/icons/12px/TargetIcon";
import { Button } from "../../../../common/v3/Button";
import { Pagination } from "../../../../common/v3/Pagination";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ContentContainer, Description, ListContainer } from "../styles";
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
      insight={props.insight}
      content={
        <ContentContainer>
          <Description>
            Excessive API calls to specific endpoint found
          </Description>
          <ListContainer>
            {pageItems.map((span) => {
              const spanName = span.clientSpan.displayName;
              const traceId = span.traceId;
              const spanCodeObjectId = span.clientSpan.spanCodeObjectId;

              return (
                <s.SpanListItem
                  key={spanCodeObjectId}
                  name={spanName}
                  onClick={() => handleLinkClick(spanCodeObjectId)}
                  buttons={[
                    config.isJaegerEnabled && traceId && (
                      <Tooltip title={"Open trace"} key={"open-trace"}>
                        <Button
                          icon={TargetIcon}
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
                        />
                      </Tooltip>
                    )
                  ]}
                />
              );
            })}
            <Pagination
              itemsCount={props.insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              withDescription={true}
            />
          </ListContainer>
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
    />
  );
};
