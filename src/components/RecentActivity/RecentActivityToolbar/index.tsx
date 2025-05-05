import { useContext } from "react";
import { ConfigContext } from "../../common/App/ConfigContext";
import { ListIcon } from "../../common/icons/ListIcon";
import { TableIcon } from "../../common/icons/TableIcon";
import { ObservabilityStatusBadge } from "../ObservabilityStatusBadge";
import { Toggle } from "../Toggle";
import type { ViewModeOption } from "../types";
import * as s from "./styles";
import type { RecentActivityToolbarProps } from "./types";

const viewModeOptions: ViewModeOption[] = [
  {
    value: "table",
    icon: TableIcon
  },
  {
    value: "list",
    icon: ListIcon
  }
];

export const RecentActivityHeader = ({
  showToolbar: showViewModeSelector,
  viewMode,
  onViewModeChange,
  environment,
  className
}: RecentActivityToolbarProps) => {
  const { isObservabilityEnabled } = useContext(ConfigContext);

  return (
    <s.Container className={className}>
      {showViewModeSelector && (
        <s.Toolbar>
          <span>Recent Activity</span>
          <Toggle
            value={viewMode}
            options={viewModeOptions}
            onChange={onViewModeChange}
          />
        </s.Toolbar>
      )}
      {!isObservabilityEnabled && environment?.type === "Private" && (
        <ObservabilityStatusBadge />
      )}
    </s.Container>
  );
};
