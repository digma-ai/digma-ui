import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { CodeDetails } from "../../../common/App/types";
import { MenuList } from "../../common/MenuList";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { TargetButtonMenuProps } from "./types";

export const TargetButtonMenu = ({
  onGoToCodeLocation,
  scope
}: TargetButtonMenuProps) => {
  const handleMenuItemClick = (codeDetails: CodeDetails) => {
    sendUserActionTrackingEvent(trackingEvents.CODE_LOCATION_SELECTED);
    onGoToCodeLocation(codeDetails);
  };

  return (
    <s.Container>
      <MenuList
        items={[
          ...scope.code.codeDetailsList.map((x) => ({
            id: x.codeObjectId,
            label: x.displayName,
            onClick: () => handleMenuItemClick(x),
            disabled: false,
            groupName: "Code locations"
          })),
          ...scope.code.relatedCodeDetailsList.map((x) => ({
            id: x.codeObjectId,
            label: x.displayName,
            onClick: () => handleMenuItemClick(x),
            disabled: false,
            groupName: "Related code locations"
          }))
        ]}
      />
    </s.Container>
  );
};
