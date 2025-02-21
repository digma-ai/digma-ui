import { SCOPE_CHANGE_EVENTS } from "../../../../types";
import { changeScope } from "../../../../utils/actions/changeScope";
import { ImpactScore } from "../../../common/ImpactScore";
import { Tooltip } from "../../../common/Tooltip";
import { AlarmClockIcon } from "../../../common/icons/AlarmClockIcon";
import { ListWidget } from "../../ListWidget";
import { WidgetType } from "../types";
import * as s from "./styles";
import type {
  ClientSpanOverallImpactEntry,
  ClientSpansPerformanceImpactProps
} from "./types";

const renderClientSpanOverallImpactEntry = (
  item: ClientSpanOverallImpactEntry,
  environment: string
) => {
  const handleSpanClick = (spanCodeObjectId: string) => () => {
    changeScope({
      span: {
        spanCodeObjectId
      },
      environmentId: environment,
      context: {
        event:
          SCOPE_CHANGE_EVENTS.DASHBOARD_CLIENT_SPANS_PERFORMANCE_IMPACT_WIDGET_ITEM_LINK_CLICKED
      }
    });
  };

  return (
    <s.Entry key={item.spanCodeObjectId}>
      <Tooltip title={item.displayName}>
        <s.SpanLink onClick={handleSpanClick(item.spanCodeObjectId)}>
          {item.displayName}
        </s.SpanLink>
      </Tooltip>
      <s.StyledCopyButton text={item.displayName} />
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

export const ClientSpansPerformanceImpact = ({
  environment
}: ClientSpansPerformanceImpactProps) => (
  <ListWidget<ClientSpanOverallImpactEntry>
    title={"Client Spans Performance Impact"}
    type={WidgetType.CLIENT_SPANS_PERFORMANCE_IMPACT}
    icon={AlarmClockIcon}
    environment={environment}
    renderListItem={renderClientSpanOverallImpactEntry}
  />
);
