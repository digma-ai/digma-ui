import { ImpactScore } from "../../../common/ImpactScore";
import { Tooltip } from "../../../common/Tooltip";
import { AlarmClockIcon } from "../../../common/icons/AlarmClockIcon";
import { ListWidget } from "../../ListWidget";
import { actions } from "../../actions";
import { WidgetType } from "../types";
import * as s from "./styles";
import {
  ClientSpanOverallImpactEntry,
  ClientSpansPerformanceImpactProps
} from "./types";

const renderClientSpanOverallImpactEntry = (
  item: ClientSpanOverallImpactEntry,
  environment: string
) => {
  const handleSpanClick = (spanCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        spanCodeObjectId,
        environment,
        type: WidgetType.CLIENT_SPANS_PERFORMANCE_IMPACT
      }
    });
  };

  return (
    <s.Entry key={item.spanCodeObjectId}>
      <Tooltip title={item.displayName}>
        <s.SpanLink onClick={() => handleSpanClick(item.spanCodeObjectId)}>
          {item.displayName}
        </s.SpanLink>
      </Tooltip>
      <s.ImpactScoreContainer>
        <ImpactScore
          score={item.overallImpact}
          showIndicator={true}
          indicatorPosition={"start"}
        />
      </s.ImpactScoreContainer>
    </s.Entry>
  );
};

export const ClientSpansPerformanceImpact = (
  props: ClientSpansPerformanceImpactProps
) => (
  <ListWidget<ClientSpanOverallImpactEntry>
    title={"Client Spans Performance Impact"}
    type={WidgetType.CLIENT_SPANS_PERFORMANCE_IMPACT}
    icon={AlarmClockIcon}
    data={props.data}
    environment={props.environment}
    renderListItem={renderClientSpanOverallImpactEntry}
  />
);
