import { useContext } from "react";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { TargetIcon } from "../../../../common/icons/12px/TargetIcon";
import { Button } from "../../../../common/v3/Button";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { InsightType, Trace } from "../../../types";
import { InsightCard } from "../../InsightCard";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import { EndpointChattyApiV2InsightProps } from "./types";

export const EndpointChattyApiV2Insight = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan
}: EndpointChattyApiV2InsightProps) => {
  const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const spanName = insight.span.clientSpan.displayName;
  const traceId = insight.span.traceId;
  const spanCodeObjectId = insight.span.clientSpan.spanCodeObjectId;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Description>
            Excessive API calls to specific endpoint found
          </Description>
          <s.SpanListItem
            name={spanName}
            onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            buttons={[
              config.isJaegerEnabled && traceId && (
                <Tooltip title={"Open Trace"} key={"openTrace"}>
                  <Button
                    icon={TargetIcon}
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
              )
            ]}
          />
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
    />
  );
};
