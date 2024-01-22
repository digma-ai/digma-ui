import { getDurationString } from "../../../../utils/getDurationString";
import { getPercentileKey } from "../../../../utils/getPercentileKey";
import { Tooltip } from "../../../common/Tooltip";
import { SnailIcon } from "../../../common/icons/SnailIcon";
import { ListWidget } from "../../ListWidget";
import { actions } from "../../actions";
import { WidgetType } from "../types";
import * as s from "./styles";
import { SlowQueriesProps, SlowQueryEntry } from "./types";

const renderSlowQueryEntry = (
  item: SlowQueryEntry,
  percentileViewMode?: number
) => {
  let durationString = "";
  if (percentileViewMode) {
    const durationKey = getPercentileKey(percentileViewMode);
    const duration = durationKey ? item[durationKey] : undefined;
    durationString = duration ? getDurationString(duration) : "";
  }

  const handleSpanClick = (spanCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_SPAN,
      payload: {
        spanCodeObjectId,
        type: WidgetType.SLOW_QUERIES
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
      {durationString && <s.Duration>{durationString}</s.Duration>}
    </s.Entry>
  );
};

export const SlowQueries = (props: SlowQueriesProps) => (
  <ListWidget<SlowQueryEntry>
    title={"Slow queries"}
    type={WidgetType.SLOW_QUERIES}
    icon={SnailIcon}
    data={props.data}
    environment={props.environment}
    renderListItem={renderSlowQueryEntry}
    showPercentileToggleSwitch={true}
  />
);
