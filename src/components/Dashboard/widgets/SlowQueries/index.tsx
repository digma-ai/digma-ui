import { ScopeChangeEvent } from "../../../../types";
import { changeScope } from "../../../../utils/actions/changeScope";
import { getDurationString } from "../../../../utils/getDurationString";
import { getPercentileKey } from "../../../../utils/getPercentileKey";
import { Tooltip } from "../../../common/Tooltip";
import { SnailIcon } from "../../../common/icons/SnailIcon";
import { ListWidget } from "../../ListWidget";
import { WidgetType } from "../types";
import * as s from "./styles";
import type { SlowQueriesProps, SlowQueryEntry } from "./types";

const renderSlowQueryEntry = (
  item: SlowQueryEntry,
  environment: string,
  percentileViewMode?: number
) => {
  let durationString = "";
  if (percentileViewMode) {
    const durationKey = getPercentileKey(percentileViewMode);
    const duration = durationKey ? item[durationKey] : undefined;
    durationString = duration ? getDurationString(duration) : "";
  }

  const handleSpanClick = (spanCodeObjectId: string) => () => {
    changeScope({
      span: {
        spanCodeObjectId
      },
      environmentId: environment,
      context: {
        event: ScopeChangeEvent.DashboardSlowQueriesWidgetItemLinkClicked
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
      {durationString && <s.Duration>{durationString}</s.Duration>}
    </s.Entry>
  );
};

export const SlowQueries = ({ environment }: SlowQueriesProps) => (
  <ListWidget<SlowQueryEntry>
    title={"Slow queries"}
    type={WidgetType.SlowQueries}
    icon={SnailIcon}
    environment={environment}
    renderListItem={renderSlowQueryEntry}
    showPercentileToggleSwitch={true}
  />
);
