import { PERCENTILES } from "../../../../../constants";
import { Toggle } from "../../../../common/v3/Toggle";
import { PercentileViewModeToggleProps } from "./types";

export const PercentileViewModeToggle = ({
  viewMode,
  onChange
}: PercentileViewModeToggleProps) => (
  <Toggle<typeof viewMode>
    options={PERCENTILES.map((percentile) => ({
      value: percentile.percentile,
      label: percentile.label
    }))}
    value={viewMode}
    onValueChange={onChange}
  />
);
