import { useGlobalStore } from "../../../../../../containers/Main/stores/useGlobalStore";
import { usePagination } from "../../../../../../hooks/usePagination";
import { TraceIcon } from "../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../common/v3/Button";
import { Pagination } from "../../../../../common/v3/Pagination";
import { Tooltip } from "../../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ListItem } from "../common/InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { EndpointSessionInViewInsightCardProps } from "./types";

const PAGE_SIZE = 3;

export const EndpointSessionInViewInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode
}: EndpointSessionInViewInsightCardProps) => {
  const isJaegerEnabled = useGlobalStore.use.isJaegerEnabled();

  const [pageItems, page, setPage] = usePagination(
    insight.spans,
    PAGE_SIZE,
    insight.id
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
      insight={insight}
      content={
        <ContentContainer>
          <Description>
            Query execution was detected during the view rendering
          </Description>
          <s.List>
            {pageItems.map((span) => {
              const spanName = span.renderSpan.displayName;
              const traceId = span.traceId;
              const spanCodeObjectId = span.renderSpan.spanCodeObjectId;
              const buttons =
                isJaegerEnabled && traceId
                  ? [
                      <Tooltip title={"Open Trace"} key={"openTrace"}>
                        <Button
                          icon={TraceIcon}
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
                        />
                      </Tooltip>
                    ]
                  : [];

              return (
                <ListItem
                  key={spanCodeObjectId}
                  onClick={() => handleLinkClick(spanCodeObjectId)}
                  name={spanName}
                  endContent={buttons}
                />
              );
            })}
            <Pagination
              itemsCount={insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              withDescription={true}
            />
          </s.List>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
    />
  );
};
