import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { FunnelIcon } from "../../../common/icons/16px/FunnelIcon";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { Tooltip } from "../../../common/v3/Tooltip";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import type { FilterButtonProps } from "./types";

export const FilterButton = ({
  isActive,
  filterCount,
  onClick
}: FilterButtonProps) => {
  const handleClick = () => {
    sendUserActionTrackingEvent(trackingEvents.FILTER_ICON_BUTTON_CLICKED);
    onClick();
  };

  return (
    <Tooltip title={"Filters"}>
      <s.Container $isActive={isActive}>
        <NewIconButton
          icon={(props) => (
            <s.ButtonContentContainer>
              <FunnelIcon {...props} />
              {filterCount > 0 && (
                <s.FilterCounter>{filterCount}</s.FilterCounter>
              )}
            </s.ButtonContentContainer>
          )}
          onClick={handleClick}
          isHighlighted={isActive}
          buttonType={"secondary"}
        />
      </s.Container>
    </Tooltip>
  );
};
