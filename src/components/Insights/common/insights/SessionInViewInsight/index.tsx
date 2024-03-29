import { useContext } from "react";
import { usePagination } from "../../../../../hooks/usePagination";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { TraceIcon } from "../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../common/v3/Button";
import { Pagination } from "../../../../common/v3/Pagination";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ListItem } from "../../InsightCard/ListItem";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { SessionInViewInsightProps } from "./types";

const PAGE_SIZE = 3;

export const SessionInViewInsight = (props: SessionInViewInsightProps) => {
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
            Query execution was detected during the view rendering
          </Description>
          <s.List>
            {pageItems.map((span) => {
              const spanName = span.renderSpan.displayName;
              const traceId = span.traceId;
              const spanCodeObjectId = span.renderSpan.spanCodeObjectId;
              const buttons =
                config.isJaegerEnabled && traceId
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
                              props.insight.type,
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
                  buttons={buttons}
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
          </s.List>
        </ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      onGoToSpan={props.onGoToSpan}
      isMarkAsReadButtonEnabled={props.isMarkAsReadButtonEnabled}
    />
  );
};
