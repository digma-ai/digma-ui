import { type ForwardedRef, forwardRef } from "react";
import { FunnelIcon } from "../../../../common/icons/16px/FunnelIcon";
import { NewIconButton } from "../../../../common/v3/NewIconButton";
import { Tooltip } from "../../../../common/v3/Tooltip";

const FilterButtonComponent = (
  props: { onClick: () => void; disabled?: boolean },
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div ref={ref}>
    <Tooltip title={"Filters"}>
      <NewIconButton
        buttonType={"secondary"}
        icon={FunnelIcon}
        size={"large"}
        {...props}
      />
    </Tooltip>
  </div>
);
export const FilterButton = forwardRef(FilterButtonComponent);
